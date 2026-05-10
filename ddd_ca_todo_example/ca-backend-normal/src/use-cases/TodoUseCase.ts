import {
    ChangeStatusRequest,
    CreateTodoRequest,
    UpdateTitleRequest,
} from '@shared/index';
import { Todo } from '@src/entities/Todo';
import { TodoGatewayPort } from '@src/use-cases/ports/TodoGatewayPort';
import { TodoInputPort } from '@src/use-cases/ports/TodoInputPort';
import { TodoOutputPort } from '@src/use-cases/ports/TodoOutputPort';
import { v4 as uuidv4 } from 'uuid';

export class TodoUseCase implements TodoInputPort {
    constructor(private readonly gateway: TodoGatewayPort) {}

    async getAll(output: TodoOutputPort): Promise<void> {
        try {
            const todos = await this.gateway.findAll();
            output.presentMany(todos);
        } catch (e) {
            output.presentError((e as Error).message);
        }
    }

    async create(req: CreateTodoRequest, output: TodoOutputPort): Promise<void> {
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

    async updateTitle(id: string, req: UpdateTitleRequest, output: TodoOutputPort): Promise<void> {
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

    async changeStatus(id: string, req: ChangeStatusRequest, output: TodoOutputPort): Promise<void> {
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

    async delete(id: string, output: TodoOutputPort): Promise<void> {
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
