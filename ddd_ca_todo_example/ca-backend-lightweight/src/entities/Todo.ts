import { StatusAction, TodoStatus, applyStatusAction, validateTitle } from '@shared/index';

export class Todo {
    constructor(
        public readonly id: string,
        public title: string,
        public status: TodoStatus,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) {}

    static create(id: string, title: string): Todo {
        const error = validateTitle(title);
        if (error) throw new Error(error);
        const now = new Date();
        return new Todo(id, title.trim(), 'pending', now, now);
    }

    changeTitle(newTitle: string): void {
        const error = validateTitle(newTitle);
        if (error) throw new Error(error);
        this.title = newTitle.trim();
        this.updatedAt = new Date();
    }

    applyAction(action: StatusAction): void {
        this.status = applyStatusAction(this.status, action);
        this.updatedAt = new Date();
    }
}
