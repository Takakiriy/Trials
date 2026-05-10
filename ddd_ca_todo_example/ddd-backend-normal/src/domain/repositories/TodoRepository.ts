import { Todo } from '@src/domain/entities/Todo';

export interface TodoRepository {
    findAll(): Promise<Todo[]>;
    findById(id: string): Promise<Todo | undefined>;
    save(todo: Todo): Promise<void>;
    delete(id: string): Promise<void>;
    existsByTitle(title: string): Promise<boolean>;
}
