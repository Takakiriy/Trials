import { Todo } from '@src/entities/Todo';

export interface TodoGatewayPort {
    findAll(): Promise<Todo[]>;
    findById(id: string): Promise<Todo | undefined>;
    save(todo: Todo): Promise<void>;
    delete(id: string): Promise<void>;
}
