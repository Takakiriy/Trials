import { TodoRepository } from '@src/domain/repositories/TodoRepository';

export class TodoDomainService {
    constructor(private readonly repo: TodoRepository) {}

    async isTitleDuplicate(title: string, excludeId?: string): Promise<boolean> {
        const all = await this.repo.findAll();
        return all.some((t) =>
            t.title.value === title.trim() && t.id !== excludeId
        );
    }
}
