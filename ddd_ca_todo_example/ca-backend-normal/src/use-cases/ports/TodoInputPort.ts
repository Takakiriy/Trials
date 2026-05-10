import {
    ChangeStatusRequest,
    CreateTodoRequest,
    UpdateTitleRequest,
} from '@shared/index';
import { TodoOutputPort } from '@src/use-cases/ports/TodoOutputPort';

export interface TodoInputPort {
    getAll(output: TodoOutputPort): Promise<void>;
    create(req: CreateTodoRequest, output: TodoOutputPort): Promise<void>;
    updateTitle(id: string, req: UpdateTitleRequest, output: TodoOutputPort): Promise<void>;
    changeStatus(id: string, req: ChangeStatusRequest, output: TodoOutputPort): Promise<void>;
    delete(id: string, output: TodoOutputPort): Promise<void>;
}
