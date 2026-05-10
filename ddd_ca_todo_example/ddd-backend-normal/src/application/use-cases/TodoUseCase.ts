import {
    ChangeStatusRequest,
    CreateTodoRequest,
    UpdateTitleRequest,
} from '@shared/index';
import { Todo } from '@src/domain/entities/Todo';
import { TodoRepository } from '@src/domain/repositories/TodoRepository';
import { TodoDomainService } from '@src/domain/services/TodoDomainService';
import { v4 as uuidv4 } from 'uuid';

export class TodoUseCase {
    constructor(
        private readonly repo: TodoRepository,
        private readonly domainService: TodoDomainService
    ) {}

    async getAll(): Promise<Todo[]> {
        return this.repo.findAll();
    }

    async create(req: CreateTodoRequest): Promise<Todo> {
        if (await this.domainService.isTitleDuplicate(req.title)) {
            throw new Error('同じタイトルのTodoが既に存在します');
        }

        const todo = Todo.create(uuidv4(), req.title);
        await this.repo.save(todo);
        return todo;
    }

    async updateTitle(id: string, req: UpdateTitleRequest): Promise<Todo> {
        const todo = await this.repo.findById(id);
        if (!todo) throw new Error('Todoが見つかりません');
        if (await this.domainService.isTitleDuplicate(req.title, id)) {
            throw new Error('同じタイトルのTodoが既に存在します');
        }

        todo.changeTitle(req.title);
        await this.repo.save(todo);
        return todo;
    }

    async changeStatus(id: string, req: ChangeStatusRequest): Promise<Todo> {
        const todo = await this.repo.findById(id);
        if (!todo) throw new Error('Todoが見つかりません');

        todo.applyAction(req.action);
        await this.repo.save(todo);
        return todo;
    }

    async delete(id: string): Promise<void> {
        const todo = await this.repo.findById(id);
        if (!todo) throw new Error('Todoが見つかりません');

        await this.repo.delete(id);
    }
}
