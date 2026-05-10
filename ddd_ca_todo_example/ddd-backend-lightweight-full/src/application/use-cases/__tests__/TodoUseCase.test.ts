import { TodoDomainService } from '@src/domain/services/TodoDomainService';
import { TodoMapStore } from '@src/infrastructure/repositories/TodoMapStore';
import { beforeEach, describe, expect, it } from 'vitest';
import { TodoUseCase } from '../TodoUseCase';

describe('TodoUseCase (Application)', () => {
    let useCase: TodoUseCase;

    beforeEach(() => {
        const db = new TodoMapStore();
        const domainService = new TodoDomainService(db);
        useCase = new TodoUseCase(db, domainService);
    });

    /**
     * isTitleDuplicate は title.trim() で比較する。
     * つまり「買い物」で登録済みのとき「  買い物  」での作成も重複とみなされるべき。
     * UseCase と DomainService が連携して初めて成立する仕様なので Application 層でテストする。
     */
    it('前後に空白があっても既存タイトルと同一とみなして重複エラーになる', async () => {
        await useCase.create({ title: '買い物' });

        await expect(useCase.create({ title: '  買い物  ' })).rejects.toThrow(
            '同じタイトルのTodoが既に存在します'
        );
    });
});
