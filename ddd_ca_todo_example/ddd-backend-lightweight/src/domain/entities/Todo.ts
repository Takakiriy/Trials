import { StatusAction } from '@shared/index';
import { TodoStatus } from '@src/domain/value-objects/TodoStatus';
import { TodoTitle } from '@src/domain/value-objects/TodoTitle';

export class Todo {
    private constructor(
        readonly id: string,
        private _title: TodoTitle,
        private _status: TodoStatus,
        readonly createdAt: Date,
        private _updatedAt: Date
    ) {}

    static create(id: string, title: string): Todo {
        const now = new Date();
        return new Todo(id, new TodoTitle(title), new TodoStatus(), now, now);
    }

    get title(): TodoTitle { return this._title; }
    get status(): TodoStatus { return this._status; }
    get updatedAt(): Date { return this._updatedAt; }

    changeTitle(newTitle: string): void {
        this._title = new TodoTitle(newTitle);
        this._updatedAt = new Date();
    }

    applyAction(action: StatusAction): void {
        this._status = this._status.applyAction(action);
        this._updatedAt = new Date();
    }
}
