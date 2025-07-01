import re
import traceback
from typing import Any, Callable, Optional, List, Dict, TypeVar
from datetime import datetime
from functools import wraps


T = TypeVar('T')


class LambdaDebugTracer:
    """Lambda関数をラップして自動的にデバッグする汎用トレーサー"""
    
    def __init__(self, name: str = "debug", verbose: bool = True, raise_on_error: bool = True):
        """
        Args:
            name: デバッグセッションの名前
            verbose: 詳細な出力を行うかどうか
            raise_on_error: エラー時に例外を再発生させるか
        """
        self.name = name
        self.verbose = verbose
        self.raise_on_error = raise_on_error
        self.call_count = 0
        self.history: List[Dict[str, Any]] = []
        self.errors: List[Dict[str, Any]] = []
        self._error_occurred = False
    
    def trace(self, func: Callable[[T], Any], default_on_error: Any = None) -> Callable[[T], Any]:
        """
        Lambda関数全体をラップしてトレースする
        
        Args:
            func: トレースしたいlambda関数
            default_on_error: エラー時に返すデフォルト値（raise_on_error=Falseの場合のみ使用）
            
        Returns:
            ラップされた関数
        """
        @wraps(func)
        def wrapper(x: T) -> Any:
            self.call_count += 1
            call_num = self.call_count
            
            try:
                # 入力値を記録
                if self.verbose:
                    # LambdaDebugTracer.TRACE_INPUT: ブレークポイントを置くための検索可能な文字列
                    print(f"[{self.name}] LambdaDebugTracer.TRACE_INPUT Call #{call_num}: Input = {x!r}")
                
                # 元の関数を実行
                result = func(x)
                
                # 成功を記録
                record = {
                    'call_number': call_num,
                    'input': x,
                    'output': result,
                    'success': True,
                    'timestamp': datetime.now()
                }
                self.history.append(record)
                
                if self.verbose:
                    # LambdaDebugTracer.TRACE_OUTPUT: 出力値確認用のブレークポイント
                    print(f"[{self.name}] LambdaDebugTracer.TRACE_OUTPUT Call #{call_num}: Output = {result!r}")
                
                return result
                
            except Exception as e:
                self._error_occurred = True
                
                # エラーを記録
                error_record = {
                    'call_number': call_num,
                    'input': x,
                    'error': str(e),
                    'error_type': type(e).__name__,
                    'timestamp': datetime.now(),
                    'traceback': traceback.format_exc()
                }
                self.errors.append(error_record)
                self.history.append({**error_record, 'success': False})
                
                if self.verbose:
                    print(f"\n{'='*60}")
                    # LambdaDebugTracer.TRACE_ERROR: エラー発生箇所のブレークポイント
                    print(f"[{self.name}] LambdaDebugTracer.TRACE_ERROR 🔴 ERROR at element #{call_num} (index {call_num - 1})")
                    print(f"  Input value: {x!r}")
                    print(f"  Error type: {type(e).__name__}")
                    print(f"  Error message: {e}")
                    print(f"{'='*60}\n")
                
                if self.raise_on_error:
                    raise
                else:
                    return default_on_error
        
        return wrapper
    
    def safe_trace(self, func: Callable[[T], Any], default: Any = 'ERROR') -> Callable[[T], Any]:
        """エラーを発生させずにデフォルト値を返すトレース"""
        return self.trace(func, default_on_error=default)
    
    def has_errors(self) -> bool:
        """エラーが発生したかどうか"""
        return len(self.errors) > 0
    
    def get_error_info(self) -> Optional[Dict[str, Any]]:
        """最初のエラーの情報を取得"""
        if self.errors:
            err = self.errors[0]
            return {
                'index': err['call_number'] - 1,
                'value': err['input'],
                'error': err['error'],
                'type': err['error_type']
            }
        return None
    
    def print_error_summary(self):
        """エラーのサマリーだけを表示"""
        if not self.errors:
            # LambdaDebugTracer.TRACE_SUMMARY_OK: エラーなしの確認用
            print(f"LambdaDebugTracer.TRACE_SUMMARY_OK ✅ No errors found in {self.call_count} calls")
            return
        
        # LambdaDebugTracer.TRACE_SUMMARY_ERROR: エラーサマリーの開始
        print(f"\nLambdaDebugTracer.TRACE_SUMMARY_ERROR 🔴 Found {len(self.errors)} error(s) in {self.call_count} calls:")
        for err in self.errors:
            print(f"  • Index {err['call_number']-1}: {err['input']!r} → {err['error_type']}: {err['error']}")
    
    def reset(self):
        """トレーサーをリセット"""
        self.call_count = 0
        self.history = []
        self.errors = []
        self._error_occurred = False


# 便利な関数
def debug_lambda(func: Callable, verbose: bool = True) -> Callable:
    """一時的なデバッグ用の関数"""
    tracer = LambdaDebugTracer("debug", verbose=verbose)
    wrapped = tracer.trace(func)
    wrapped._tracer = tracer
    return wrapped


def safe_debug_lambda(func: Callable, default: Any = 'ERROR', verbose: bool = True) -> Callable:
    """エラーを発生させない安全なデバッグ"""
    tracer = LambdaDebugTracer("safe_debug", verbose=verbose, raise_on_error=False)
    wrapped = tracer.trace(func, default_on_error=default)
    wrapped._tracer = tracer
    return wrapped


# 使用例
if __name__ == "__main__":
    import pandas as pd
    
    # サンプルデータ作成（問題のある列名を含む）
    df = pd.DataFrame({
        'col1': [1, 2, 3],
        'col.2': [4, 5, 6],
        'col3': [7, 8, 9],
        '': [10, 11, 12],  # 空文字列の列名（問題）
        'data4': [13, 14, 15],
        123: [16, 17, 18],  # 数値の列名（問題）
    })
    
    print("DataFrame columns:", df.columns.tolist())
    
    # ==========================================
    # 例1: 最もシンプルな使い方 - debug_lambda
    # ==========================================
    print("\n" + "="*60)
    print("Example 1: Simplest usage with debug_lambda")
    print("="*60)
    
    # 元のコード（エラーが発生する）:
    # result = df.groupby(lambda x: re.split('\.|\d', x)[0], axis=1).sum()
    
    # 最もシンプルなデバッグ版:
    result = df.groupby(
        debug_lambda(lambda x: re.split('\.|\d', x)[0]), 
        axis=1
    ).sum()
    
    # ==========================================
    # 例2: 安全なデバッグ（エラーを無視）
    # ==========================================
    print("\n" + "="*60)
    print("Example 2: Safe debugging - continue on errors")
    print("="*60)
    
    # 元のコード（エラーで停止）:
    # result = df.groupby(lambda x: re.split('\.|\d', x)[0], axis=1).sum()
    
    # 安全なデバッグ版:
    tracer_safe = LambdaDebugTracer("safe", verbose=False, raise_on_error=False)
    result = df.groupby(
        tracer_safe.trace(lambda x: re.split('\.|\d', x)[0], default_on_error='OTHER'), 
        axis=1
    ).sum()
    
    print("Groupby completed with defaults for errors:")
    print(result)
    tracer_safe.print_error_summary()
    
    # ==========================================
    # 例3: 複雑な処理のデバッグ
    # ==========================================
    print("\n" + "="*60)
    print("Example 3: Complex lambda debugging")
    print("="*60)
    
    # 元のコード（複雑なlambda）:
    # result = df.apply(lambda col: col.sum() if col.name.startswith('col') else col.mean(), axis=0)
    
    # デバッグ版:
    tracer_complex = LambdaDebugTracer("complex", verbose=True)
    result = df.apply(
        tracer_complex.trace(
            lambda col: col.sum() if str(col.name).startswith('col') else col.mean()
        ), 
        axis=0
    )
    print("\nResult:")
    print(result)
    
    # ==========================================
    # 例4: ブレークポイントの設置方法
    # ==========================================
    print("\n" + "="*60)
    print("Example 4: How to set breakpoints")
    print("="*60)
    
    print("""
    ブレークポイントを設置するには、出力から以下の文字列をコピーしてgrep検索:
    
    1. "LambdaDebugTracer.TRACE_INPUT"    - 入力値の確認時
    2. "LambdaDebugTracer.TRACE_OUTPUT"   - 出力値の確認時
    3. "LambdaDebugTracer.TRACE_ERROR"    - エラー発生時
    4. "LambdaDebugTracer.TRACE_SUMMARY"  - サマリー出力時
    
    例: grep -n "LambdaDebugTracer.TRACE_ERROR" lambda_debug_tracer.py
    """)
    
    # ==========================================
    # 例5: フィルタリング処理のデバッグ
    # ==========================================
    print("\n" + "="*60)
    print("Example 5: Debug filtering operations")
    print("="*60)
    
    data = ['apple', 'banana', '', None, 'cherry', 123, 'date']
    
    # 元のコード（型エラーが発生する可能性）:
    # filtered = list(filter(lambda x: len(x) > 4, data))
    
    # デバッグ版:
    tracer_filter = LambdaDebugTracer("filter", verbose=True)
    filtered = list(filter(
        tracer_filter.safe_trace(
            lambda x: len(str(x)) > 4 if x is not None else False,
            default=False
        ),
        data
    ))
    
    print(f"\nFiltered result: {filtered}")
    
    # ==========================================
    # 例6: マッピング処理のデバッグ
    # ==========================================
    print("\n" + "="*60)
    print("Example 6: Debug mapping operations")
    print("="*60)
    
    # 元のコード:
    # squared = list(map(lambda x: x**2, [1, 2, '3', 4, None]))
    
    # デバッグ版:
    tracer_map = LambdaDebugTracer("map", verbose=False)
    numbers = [1, 2, '3', 4, None, 5]
    squared = list(map(
        tracer_map.trace(lambda x: int(x)**2 if x is not None else 0),
        numbers
    ))
    
    tracer_map.print_error_summary()
    
    print("\n" + "="*60)
    print("Debugging tips:")
    print("="*60)
    print("""
    1. 出力から "LambdaDebugTracer.TRACE_" で始まる文字列をコピー
    2. grep -n "LambdaDebugTracer.TRACE_ERROR" *.py でエラー箇所を検索
    3. IDEやエディタでその行にブレークポイントを設置
    4. import pdb; pdb.set_trace() を挿入してデバッグ
    """)