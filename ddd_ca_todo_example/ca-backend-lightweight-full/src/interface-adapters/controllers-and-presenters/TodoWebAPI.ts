import { TodoJson } from '@shared/index';
import { Todo } from '@src/entities/Todo';
import type { TodoUseCase } from '@src/use-cases/TodoUseCase';
import { Request, Response, Router } from 'express';

export class TodoPresentation {
    readonly router: Router;

    constructor(private readonly useCase: TodoUseCase) {
        this.router = Router();
        this.register();
    }

    private register(): void {
        this.router.get('/', async (_req: Request, res: Response) => {
            const output = new ExpressTodoOutputPort();
            await this.useCase.getAll(output);
            output.send(res);
        });

        this.router.post('/', async (req: Request, res: Response) => {
            const output = new ExpressTodoOutputPort();
            await this.useCase.create(req.body, output);
            output.send(res);
        });

        this.router.patch('/:id/title', async (req: Request, res: Response) => {
            const output = new ExpressTodoOutputPort();
            await this.useCase.updateTitle(req.params.id, req.body, output);
            output.send(res);
        });

        this.router.patch('/:id/status', async (req: Request, res: Response) => {
            const output = new ExpressTodoOutputPort();
            await this.useCase.changeStatus(req.params.id, req.body, output);
            output.send(res);
        });

        this.router.delete('/:id', async (req: Request, res: Response) => {
            const output = new ExpressTodoOutputPort();
            await this.useCase.delete(req.params.id, output);
            output.send(res);
        });
    }
}

export class ExpressTodoOutputPort {
    private result: { status: number; body: unknown } | undefined;

    presentOne(todo: Todo): void {
        this.result = { status: 200, body: { success: true, data: toJson(todo) } };
    }

    presentMany(todos: Todo[]): void {
        this.result = { status: 200, body: { success: true, data: todos.map(toJsonV2) } };
    }

    presentDeleted(): void {
        this.result = { status: 200, body: { success: true, data: null } };
    }

    presentError(message: string): void {
        this.result = { status: 400, body: { success: false, message } };
    }

    send(res: Response): void {
        if (this.result) {
            res.status(this.result.status).json(this.result.body);
        }
    }
}

function toJson(todo: Todo): TodoJson {
    return {
        id: todo.id,
        title: todo.title,
        status: todo.status,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
    };
}

function toJsonV2(todo: Todo): TodoJson {
    return {
        id: todo.id,
        title: todo.title,
        status: todo.status,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
        updatedAtList: todo.updatedAtList.map((u) => u.toISOString()),
    };
}
