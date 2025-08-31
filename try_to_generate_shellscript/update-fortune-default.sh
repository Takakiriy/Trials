#!/bin/bash

# GitHub Pages 今日の運勢更新スクリプト
# 使用前に設定を変更してください

set -e  # エラーが発生したら終了

# ====== 設定項目 ======
REPO_URL="https://github.com/username/repository.git"  # GitHubリポジトリのURL
BRANCH="main"  # または "gh-pages"
HTML_FILE="index.html"  # 運勢が書かれているHTMLファイル
TEMP_DIR="/tmp/fortune_update_$$"

# ====== 運勢のパターン ======
FORTUNES=(
    "今日は素晴らしい一日になるでしょう！新しいチャンスが訪れるかもしれません。"
    "穏やかな一日です。リラックスして過ごすのが吉。"
    "少し注意が必要な日です。慎重に行動しましょう。"
    "運気上昇中！積極的に行動すると良い結果が得られそう。"
    "今日は学びの日。新しい知識を得るのに最適です。"
    "人とのつながりを大切にする日。コミュニケーションを心がけて。"
    "創造性が高まっています。アイデアを形にしてみましょう。"
    "健康に気をつけて。適度な休息も大切です。"
    "金運が良好です。ただし無駄遣いは避けて。"
    "恋愛運アップ！素敵な出会いがあるかもしれません。"
    "仕事運好調。新しいプロジェクトを始めるのに良い日。"
    "家族や友人との時間を大切にしましょう。"
)

# ====== ログ関数 ======
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

error_exit() {
    log "エラー: $1" >&2
    cleanup
    exit 1
}

cleanup() {
    if [ -d "$TEMP_DIR" ]; then
        log "一時ディレクトリを削除中..."
        rm -rf "$TEMP_DIR"
    fi
}

# ====== メイン処理 ======
main() {
    log "今日の運勢更新スクリプトを開始します"
    
    # 必要なコマンドの確認
    command -v git >/dev/null 2>&1 || error_exit "gitコマンドが見つかりません"
    command -v sed >/dev/null 2>&1 || error_exit "sedコマンドが見つかりません"
    
    # 一時ディレクトリ作成
    mkdir -p "$TEMP_DIR" || error_exit "一時ディレクトリの作成に失敗"
    cd "$TEMP_DIR"
    
    # リポジトリをクローン
    log "リポジトリをクローン中..."
    git clone "$REPO_URL" repo || error_exit "リポジトリのクローンに失敗"
    cd repo
    
    # 指定ブランチに切り替え
    git checkout "$BRANCH" || error_exit "ブランチ $BRANCH への切り替えに失敗"
    
    # HTMLファイルの存在確認
    if [ ! -f "$HTML_FILE" ]; then
        error_exit "HTMLファイル $HTML_FILE が見つかりません"
    fi
    
    # ランダムに運勢を選択
    RANDOM_INDEX=$((RANDOM % ${#FORTUNES[@]}))
    TODAY_FORTUNE="${FORTUNES[$RANDOM_INDEX]}"
    TODAY_DATE=$(date '+%Y年%m月%d日')
    
    log "選択された運勢: $TODAY_FORTUNE"
    
    # HTMLファイルを更新
    # <!-- 今日の運勢開始 --> と <!-- 今日の運勢終了 --> の間を置換
    if grep -q "<!-- 今日の運勢開始 -->" "$HTML_FILE"; then
        log "HTMLファイルを更新中..."
        
        # 新しい運勢セクションを作成
        NEW_FORTUNE_SECTION="<!-- 今日の運勢開始 -->
    <div class=\"fortune\">
        <h2>今日の運勢 ($TODAY_DATE)</h2>
        <p>$TODAY_FORTUNE</p>
        <p><small>最終更新: $(date '+%Y-%m-%d %H:%M:%S')</small></p>
    </div>
    <!-- 今日の運勢終了 -->"
        
        # sedを使って置換（macOSとLinux両対応）
        if sed --version >/dev/null 2>&1; then
            # GNU sed (Linux)
            sed -i "/<!-- 今日の運勢開始 -->/,/<!-- 今日の運勢終了 -->/c\\
$NEW_FORTUNE_SECTION" "$HTML_FILE"
        else
            # BSD sed (macOS)
            sed -i '' "/<!-- 今日の運勢開始 -->/,/<!-- 今日の運勢終了 -->/c\\
$NEW_FORTUNE_SECTION" "$HTML_FILE"
        fi
        
        log "HTMLファイルの更新完了"
    else
        error_exit "HTMLファイルに運勢セクションが見つかりません。<!-- 今日の運勢開始 --> コメントを追加してください"
    fi
    
    # 変更をコミット
    git add "$HTML_FILE"
    
    if git diff --staged --quiet; then
        log "変更がありません。処理を終了します"
        cleanup
        exit 0
    fi
    
    log "変更をコミット中..."
    git commit -m "今日の運勢を更新: $TODAY_DATE

$TODAY_FORTUNE

自動更新: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # リモートにプッシュ
    log "リモートリポジトリにプッシュ中..."
    git push origin "$BRANCH" || error_exit "プッシュに失敗しました"
    
    log "今日の運勢の更新が完了しました！"
    log "GitHub Pagesの更新には数分かかる場合があります"
    
    cleanup
}

# ====== エラーハンドリング ======
trap cleanup EXIT INT TERM

# ====== スクリプト実行 ======
main "$@"
