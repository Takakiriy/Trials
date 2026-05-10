import { describe, expect, it } from 'vitest';
import { Todo } from '../Todo';

describe('Todo (Domain Entity)', () => {
    /**
     * changeTitle は内部で new TodoTitle(newTitle) を生成してバリデーションを通す。
     * ここでテストしたいのは「同じタイトルへの変更がエラーにならない」という
     * Entity 自身の仕様であり、重複チェック（DomainService）とは別の関心事である。
     */
    it('同じタイトルへの変更はエラーにならない', () => {
        const todo = Todo.create('id-1', '買い物');

        // 同じ値で changeTitle を呼んでも例外が発生しないこと
        expect(() => todo.changeTitle('買い物')).not.toThrow();
        expect(todo.title.value).toBe('買い物');
    });
});
