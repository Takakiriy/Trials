import { Todo } from '@src/entities/Todo';

export class TodoMapStore {
    private store = new Map<string, Todo>();

    async findAll(): Promise<Todo[]> {
        return Array.from(this.store.values()).sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
    }

    async findById(id: string): Promise<Todo | undefined> {
        return this.store.get(id);
    }

    async save(todo: Todo): Promise<void> {
        this.store.set(todo.id, todo);
    }

    async delete(id: string): Promise<void> {
        this.store.delete(id);
    }
}
