import type { StatusAction, TodoJson } from '@shared/index';
import { api } from '@src/api/todoApi';
import type { FilterType } from '@src/types/todo';
import { useCallback, useEffect, useState } from 'react';

export function useTodos() {
    const [todos, setTodos] = useState<TodoJson[]>([]);
    const [filter, setFilter] = useState<FilterType>('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const load = useCallback(async () => {
        setLoading(true);
        setError(undefined);
        try {
            setTodos(await api.getAll());
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const create = async (title: string) => {
        await api.create({ title });
        await load();
    };

    const updateTitle = async (id: string, title: string) => {
        await api.updateTitle(id, { title });
        await load();
    };

    const changeStatus = async (id: string, action: StatusAction) => {
        await api.changeStatus(id, { action });
        await load();
    };

    const remove = async (id: string) => {
        await api.delete(id);
        await load();
    };

    const filtered = filter === 'all' ? todos : todos.filter((t) => t.status === filter);

    return { todos: filtered, allTodos: todos, filter, setFilter, loading, error, create, updateTitle, changeStatus, remove };
}
