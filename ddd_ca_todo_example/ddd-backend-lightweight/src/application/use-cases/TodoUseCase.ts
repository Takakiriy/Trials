import { ChangeStatusRequest, CreateTodoRequest, UpdateTitleRequest } from '@shared/index';
import { Todo } from '@src/domain/entities/Todo';
import { TodoDomainService } from '@src/domain/services/TodoDomainService';
import type { TodoMapStore } from '@src/infrastructure/repositories/TodoMapStore';
import { v4 as uuidv4 } from 'uuid';

export class TodoUseCase {
    constructor(
        private readonly database: TodoMapStore,
        private readonly domainService: TodoDomainService
    ) {}

    async getAll(): Promise<Todo[]> {
        return this.database.findAll();
    }

    async create(req: CreateTodoRequest): Promise<Todo> {
        if (await this.domainService.isTitleDuplicate(req.title)) {
            throw new Error('同じタイトルのTodoが既に存在します');
        }

        const todo = Todo.create(uuidv4(), req.title);
        await this.database.save(todo);
        return todo;
    }

    async updateTitle(id: string, req: UpdateTitleRequest): Promise<Todo> {
        const todo = await this.database.findById(id);
        if (!todo) throw new Error('Todoが見つかりません');
        if (await this.domainService.isTitleDuplicate(req.title, id)) {
            throw new Error('同じタイトルのTodoが既に存在します');
        }

        todo.changeTitle(req.title);
        await this.database.save(todo);
        return todo;
    }

    async changeStatus(id: string, req: ChangeStatusRequest): Promise<Todo> {
        const todo = await this.database.findById(id);
        if (!todo) throw new Error('Todoが見つかりません');

        todo.applyAction(req.action);
        await this.database.save(todo);
        return todo;
    }

    async delete(id: string): Promise<void> {
        const todo = await this.database.findById(id);
        if (!todo) throw new Error('Todoが見つかりません');

        await this.database.delete(id);
    }
}
