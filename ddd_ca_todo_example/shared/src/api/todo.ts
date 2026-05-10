import { TodoStatus } from '../domain/todo';

export interface TodoJson {
    id: string;
    title: string;
    status: TodoStatus;
    createdAt: string;
    updatedAt: string;

    // Version 2
    updatedAtList?: string[];
}

export interface CreateTodoRequest {
    title: string;
}

export interface UpdateTitleRequest {
    title: string;
}

export interface ChangeStatusRequest {
    action: import('../domain/todo').StatusAction;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}
