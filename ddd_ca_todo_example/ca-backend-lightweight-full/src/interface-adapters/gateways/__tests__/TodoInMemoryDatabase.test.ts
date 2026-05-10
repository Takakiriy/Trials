import { Todo } from '@src/entities/Todo';
import { beforeEach, describe, expect, it } from 'vitest';
import { TodoMapStore } from '../TodoMapStore';

describe('TodoInMemoryDatabase (Frameworks)', () => {
    let db: TodoMapStore;

    beforeEach(() => {
        db = new TodoMapStore();
    });

    /**
     * ddd-backend-lightweight の TodoInMemoryDatabase は Map で実装されていた。
     * ca-backend-lightweight では Record（プレーンオブジェクト）で実装されている。
     * Record はキーの挿入順に依存するため、ソートが正しく効いているかを確認する。
     */
    it('findAll は作成日時の新しい順に返す', async () => {
        const older = Todo.create('id-1', '古いTodo');
        await new Promise((r) => setTimeout(r, 10));
        const newer = Todo.create('id-2', '新しいTodo');

        await db.save(older);
        await db.save(newer);

        const result = await db.findAll();

        expect(result[0].id).toBe('id-2'); // 新しい方が先頭
        expect(result[1].id).toBe('id-1');
    });
});
