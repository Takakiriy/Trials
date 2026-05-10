import { describe, expect, it } from 'vitest';
import { Todo } from '../Todo';

describe('Todo (Entities)', () => {
    /**
     * ddd-backend-lightweight では TodoTitle（Value Object）が trim を担っていた。
     * ca-backend-lightweight では Todo エンティティ自身が validateTitle と trim を持つ。
     * バリデーションと trim がエンティティの責務であることをテストで示す。
     */
    it('前後に空白があるタイトルは trim されて保存される', () => {
        const todo = Todo.create('id-1', '  買い物  ');

        expect(todo.title).toBe('買い物');
    });
});
