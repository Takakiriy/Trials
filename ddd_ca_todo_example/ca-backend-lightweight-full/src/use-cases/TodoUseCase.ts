import { ChangeStatusRequest, CreateTodoRequest, UpdateTitleRequest } from '@shared/index';
import { Todo } from '@src/entities/Todo';
import type { ExpressTodoOutputPort } from '@src/interface-adapters/controllers-and-presenters/TodoWebAPI';
import type { TodoMapStore } from '@src/interface-adapters/gateways/TodoMapStore';
import { v4 as uuidv4 } from 'uuid';

export class TodoUseCase {
    constructor(private readonly gateway: TodoMapStore) {}

    async getAll(output: ExpressTodoOutputPort): Promise<void> {
        try {
            const todos = await this.gateway.findAll();
            output.presentMany(todos);
        } catch (e) {
            output.presentError((e as Error).message);
        }
    }

    async create(req: CreateTodoRequest, output: ExpressTodoOutputPort): Promise<void> {
        try {
            const all = await this.gateway.findAll();
            if (all.some((t) => t.title === req.title.trim())) {
                return output.presentError('同じタイトルのTodoが既に存在します');
            }

            const todo = Todo.create(uuidv4(), req.title);
            await this.gateway.save(todo);
            output.presentOne(todo);
        } catch (e) {
            output.presentError((e as Error).message);
        }
    }

    async updateTitle(id: string, req: UpdateTitleRequest, output: ExpressTodoOutputPort): Promise<void> {
        try {
            const todo = await this.gateway.findById(id);
            if (!todo) return output.presentError('Todoが見つかりません');
            const all = await this.gateway.findAll();
            if (all.some((t) => t.title === req.title.trim() && t.id !== id)) {
                return output.presentError('同じタイトルのTodoが既に存在します');
            }

            todo.changeTitle(req.title);
            await this.gateway.save(todo);
            output.presentOne(todo);
        } catch (e) {
            output.presentError((e as Error).message);
        }
    }

    async changeStatus(id: string, req: ChangeStatusRequest, output: ExpressTodoOutputPort): Promise<void> {
        try {
            const todo = await this.gateway.findById(id);
            if (!todo) return output.presentError('Todoが見つかりません');

            todo.applyAction(req.action);
            await this.gateway.save(todo);
            output.presentOne(todo);
        } catch (e) {
            output.presentError((e as Error).message);
        }
    }

    async delete(id: string, output: ExpressTodoOutputPort): Promise<void> {
        try {
            const todo = await this.gateway.findById(id);
            if (!todo) return output.presentError('Todoが見つかりません');

            await this.gateway.delete(id);
            output.presentDeleted();
        } catch (e) {
            output.presentError((e as Error).message);
        }
    }
}
