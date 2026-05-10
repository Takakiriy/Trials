import type {
    ApiResponse,
    ChangeStatusRequest,
    CreateTodoRequest,
    TodoJson,
    UpdateTitleRequest,
} from '@shared/index';

const baseUrl = (import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3001') + '/todos';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(baseUrl + path, {
        headers: { 'Content-Type': 'application/json' },
        ...init,
    });
    const json: ApiResponse<T> = await res.json();
    if (!json.success) throw new Error(json.message ?? 'エラーが発生しました');
    return json.data as T;
}

export const api = {
    getAll: () => request<TodoJson[]>(''),
    create: (req: CreateTodoRequest) =>
        request<TodoJson>('', { method: 'POST', body: JSON.stringify(req) }),
    updateTitle: (id: string, req: UpdateTitleRequest) =>
        request<TodoJson>(`/${id}/title`, { method: 'PATCH', body: JSON.stringify(req) }),
    changeStatus: (id: string, req: ChangeStatusRequest) =>
        request<TodoJson>(`/${id}/status`, { method: 'PATCH', body: JSON.stringify(req) }),
    delete: (id: string) =>
        request<null>(`/${id}`, { method: 'DELETE' }),
};
