import { Todo } from '@src/domain/entities/Todo';
import { TodoRepository } from '@src/domain/repositories/TodoRepository';

export class TodoMapStore implements TodoRepository {
    private store: Record<string, Todo> = {};

    async findAll(): Promise<Todo[]> {
        return Object.values(this.store).sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
    }

    async findById(id: string): Promise<Todo | undefined> {
        return this.store[id];
    }

    async save(todo: Todo): Promise<void> {
        this.store[todo.id] = todo;
    }

    async delete(id: string): Promise<void> {
        delete this.store[id];
    }

    async existsByTitle(title: string): Promise<boolean> {
        return Object.values(this.store).some((t) => t.title.value === title);
    }
}
