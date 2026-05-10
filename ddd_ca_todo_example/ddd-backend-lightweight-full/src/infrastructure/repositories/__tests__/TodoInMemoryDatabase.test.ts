import { Todo } from '@src/domain/entities/Todo';
import { beforeEach, describe, expect, it } from 'vitest';
import { TodoMapStore } from '../TodoMapStore';

describe('TodoInMemoryDatabase (Infrastructure)', () => {
    let db: TodoMapStore;

    beforeEach(() => {
        db = new TodoMapStore();
    });

    /**
     * findAll は createdAt の降順で返す仕様。
     * 複数件を順番に save したとき、最後に作ったものが先頭になることを確認する。
     * ソート責務が Repository にあることをテストで明示している。
     */
    it('findAll は作成日時の新しい順に返す', async () => {
        // 時刻差を確実につけるため、createdAt を明示的にずらして生成する
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
