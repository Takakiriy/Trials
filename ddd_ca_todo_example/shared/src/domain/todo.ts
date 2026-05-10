export type TodoStatus = 'pending' | 'in_progress' | 'done';
export type StatusAction = 'start' | 'complete' | 'reopen';

export const titleMaxLength = 100;
export const titleMinLength = 1;

export function validateTitle(title: string): string | undefined {
    const trimmed = title.trim();
    if (trimmed.length < titleMinLength) return 'タイトルを入力してください';
    if (trimmed.length > titleMaxLength) return `タイトルは${titleMaxLength}文字以内にしてください`;
    return undefined;
}

const statusTransitionRules: Record<TodoStatus, StatusAction[]> = {
    pending: ['start'],
    in_progress: ['complete'],
    done: ['reopen'],
};

export function applyStatusAction(current: TodoStatus, action: StatusAction): TodoStatus {
    const allowed = statusTransitionRules[current];
    if (!allowed.includes(action)) {
        throw new Error(`ステータス「${current}」では「${action}」操作はできません`);
    }
    if (action === 'start') return 'in_progress';
    if (action === 'complete') return 'done';
    return 'pending';
}

export function allowedActions(status: TodoStatus): StatusAction[] {
    return statusTransitionRules[status];
}
