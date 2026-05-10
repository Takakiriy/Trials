import { StatusAction, TodoStatus, applyStatusAction, validateTitle } from '@shared/index';

export class Todo {
    constructor(
        public readonly id: string,
        public title: string,
        public status: TodoStatus,
        public readonly createdAt: Date,
        private _updatedAt: Date[]
    ) {}

    static create(id: string, title: string): Todo {
        const error = validateTitle(title);
        if (error) throw new Error(error);
        const now = new Date();
        return new Todo(id, title.trim(), 'pending', now, [now]);
    }

    get updatedAt(): Date { return this._updatedAt[0]; }
    get updatedAtList(): readonly Date[] { return [...this._updatedAt]; }

    private updateTimestamp(): void {
        this._updatedAt = [new Date(), this._updatedAt[0]];
    }

    changeTitle(newTitle: string): void {
        const error = validateTitle(newTitle);
        if (error) throw new Error(error);
        this.title = newTitle.trim();
        this.updateTimestamp();
    }

    applyAction(action: StatusAction): void {
        this.status = applyStatusAction(this.status, action);
        this.updateTimestamp();
    }
}
