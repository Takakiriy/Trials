import { Todo } from '@src/entities/Todo';

export interface TodoOutputPort {
    presentOne(todo: Todo): void;
    presentMany(todos: Todo[]): void;
    presentDeleted(): void;
    presentError(message: string): void;
}
