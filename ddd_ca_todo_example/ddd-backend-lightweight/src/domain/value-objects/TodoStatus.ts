import { StatusAction, TodoStatus as TodoStatusType, allowedActions, applyStatusAction } from '@shared/index';

export class TodoStatus {
    readonly value: TodoStatusType;

    constructor(value: TodoStatusType = 'pending') {
        this.value = value;
    }

    applyAction(action: StatusAction): TodoStatus {
        const next = applyStatusAction(this.value, action);
        return new TodoStatus(next);
    }

    allowedActions(): StatusAction[] {
        return allowedActions(this.value);
    }

    equals(other: TodoStatus): boolean {
        return this.value === other.value;
    }
}
