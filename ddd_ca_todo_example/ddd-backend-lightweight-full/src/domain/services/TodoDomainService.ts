import type { TodoMapStore } from '@src/infrastructure/repositories/TodoMapStore';

export class TodoDomainService {
    constructor(private readonly repo: TodoMapStore) {}

    async isTitleDuplicate(title: string, excludeId?: string): Promise<boolean> {
        const all = await this.repo.findAll();
        return all.some((t) =>
            t.title.value === title.trim() && t.id !== excludeId
        );
    }
}
