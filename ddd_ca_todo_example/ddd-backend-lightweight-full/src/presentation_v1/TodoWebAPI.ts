import { TodoJson } from '@shared/index';
import { TodoUseCase } from '@src/application/use-cases/TodoUseCase';
import { Todo } from '@src/domain/entities/Todo';
import { Request, Response, Router } from 'express';

export class TodoWebAPI {
    readonly router: Router;

    constructor(private readonly useCase: TodoUseCase) {
        this.router = Router();
        this.register();
    }

    private register(): void {
        const ok = <T>(res: Response, data: T) => res.json({ success: true, data });
        const fail = (res: Response, e: unknown, status = 400) =>
            res.status(status).json({ success: false, message: (e as Error).message });

        this.router.get('/', async (_req: Request, res: Response) => {
            try { ok(res, (await this.useCase.getAll()).map(toJson)); } catch (e) { fail(res, e, 500); }
        });
        this.router.post('/', async (req: Request, res: Response) => {
            try { ok(res, toJson(await this.useCase.create(req.body))); } catch (e) { fail(res, e); }
        });
        this.router.patch('/:id/title', async (req: Request, res: Response) => {
            try { ok(res, toJson(await this.useCase.updateTitle(req.params.id, req.body))); } catch (e) { fail(res, e); }
        });
        this.router.patch('/:id/status', async (req: Request, res: Response) => {
            try { ok(res, toJson(await this.useCase.changeStatus(req.params.id, req.body))); } catch (e) { fail(res, e); }
        });
        this.router.delete('/:id', async (req: Request, res: Response) => {
            try { await this.useCase.delete(req.params.id); ok(res, null); } catch (e) { fail(res, e); }
        });
    }
}

function toJson(todo: Todo): TodoJson {
    return {
        id: todo.id,
        title: todo.title.value,
        status: todo.status.value,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
    };
}
