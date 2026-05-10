import type { StatusAction, TodoJson, TodoStatus } from '@shared/index';
import { allowedActions } from '@shared/index';
import { useTodos } from '@src/hooks/useTodos';
import type { FilterType } from '@src/types/todo';
import { useState } from 'react';

function TodoItem({
    todo,
    onChangeStatus,
    onUpdateTitle,
    onDelete,
}: {
    todo: TodoJson;
    onChangeStatus: (action: StatusAction) => void;
    onUpdateTitle: (title: string) => void;
    onDelete: () => void;
}) {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.title);
    const [err, setErr] = useState('');

    const submit = async () => {
        if (editValue.trim() === todo.title) { setEditing(false); return; }
        try {
            await onUpdateTitle(editValue);
            setEditing(false);
            setErr('');
        } catch (e) {
            setErr((e as Error).message);
        }
    };

    const actions = allowedActions(todo.status);

    return (
        <div
            data-testid="todo-item"
            style={{
                background: '#1e293b',
                borderRadius: 12,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderLeft: `4px solid ${statusColor[todo.status]}`,
            }}
        >
            <div style={{ flex: 1, minWidth: 0 }}>
                {editing ? (
                    <div>
                        <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') setEditing(false); }}
                            autoFocus
                            style={{
                                background: '#0f172a', color: '#f1f5f9', border: '1px solid #3b82f6',
                                borderRadius: 6, padding: '4px 8px', width: '100%', fontSize: 15,
                            }}
                        />
                        {err && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{err}</div>}
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            <button onClick={submit} style={btnStyle('#3b82f6')}>保存</button>
                            <button onClick={() => setEditing(false)} style={btnStyle('#475569')}>キャンセル</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            onClick={() => setEditing(true)}
                            style={{
                                color: todo.status === 'done' ? '#64748b' : '#f1f5f9',
                                textDecoration: todo.status === 'done' ? 'line-through' : 'none',
                                cursor: 'pointer', fontSize: 15,
                            }}
                        >
                            {todo.title}
                        </div>
                        <div>
                            <span style={{fontSize: 9}}>
                                {todo.updatedAt}
                            </span>

                            { todo.updatedAtList  &&  todo.updatedAtList.length === 2 ?
                                <span style={{fontSize: 9}}>
                                    , {todo.updatedAtList[1]}
                                </span>
                            :<></>}
                        </div>
                    </>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <span style={{
                        fontSize: 11, padding: '2px 8px', borderRadius: 999,
                        background: statusColor[todo.status] + '33',
                        color: statusColor[todo.status],
                        fontWeight: 600,
                    }}>
                        {statusLabel[todo.status]}
                    </span>
                    {actions.map((action) => (
                        <button key={action} onClick={() => onChangeStatus(action)} style={btnStyle('#334155', 11)}>
                            {actionLabel[action]}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={onDelete} title="削除" style={{
                background: 'none', border: 'none', color: '#475569', cursor: 'pointer',
                fontSize: 18, padding: 4, lineHeight: 1,
                transition: 'color .15s',
            }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
            >✕</button>
        </div>
    );
}

const statusLabel: Record<TodoStatus, string> = {
    pending: '未着手',
    in_progress: '進行中',
    done: '完了',
};

const actionLabel: Record<StatusAction, string> = {
    start: '開始',
    complete: '完了にする',
    reopen: '再開',
};

const statusColor: Record<TodoStatus, string> = {
    pending: '#94a3b8',
    in_progress: '#3b82f6',
    done: '#22c55e',
};

const backendName = import.meta.env.VITE_BACKEND_URL?.includes('3002')
    ? 'クリーンアーキテクチャ'
    : 'DDD';

function btnStyle(bg: string, fs = 13): React.CSSProperties {
    return {
        background: bg, color: '#f1f5f9', border: 'none', borderRadius: 6,
        padding: '4px 10px', cursor: 'pointer', fontSize: fs, fontWeight: 500,
    };
}

const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'すべて' },
    { value: 'pending', label: '未着手' },
    { value: 'in_progress', label: '進行中' },
    { value: 'done', label: '完了' },
];

export default function App() {
    const { todos, allTodos, filter, setFilter, loading, error, create, updateTitle, changeStatus, remove } = useTodos();
    const [input, setInput] = useState('');
    const [createErr, setCreateErr] = useState('');

    const handleCreate = async () => {
        if (!input.trim()) return;
        try {
            await create(input.trim());
            setInput('');
            setCreateErr('');
        } catch (e) {
            setCreateErr((e as Error).message);
        }
    };

    const counts: Record<FilterType, number> = {
        all: allTodos.length,
        pending: allTodos.filter((t) => t.status === 'pending').length,
        in_progress: allTodos.filter((t) => t.status === 'in_progress').length,
        done: allTodos.filter((t) => t.status === 'done').length,
    };

    return (
        <div style={{
            minHeight: '100vh', background: '#0f172a', color: '#f1f5f9',
            fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif",
            padding: '32px 16px',
        }}>
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
                        Todo アプリ
                    </h1>
                    <div style={{
                        marginTop: 6, fontSize: 12, color: '#64748b',
                        background: '#1e293b', display: 'inline-block',
                        padding: '3px 10px', borderRadius: 999,
                    }}>
                        バックエンド: {backendName}（ポート {import.meta.env.VITE_BACKEND_URL?.split(':').pop() ?? '3001'}）
                    </div>
                </div>

                {/* Create form */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                        placeholder="新しいTodoを追加..."
                        style={{
                            flex: 1, background: '#1e293b', color: '#f1f5f9',
                            border: '1px solid #334155', borderRadius: 10,
                            padding: '10px 14px', fontSize: 15, outline: 'none',
                        }}
                    />
                    <button onClick={handleCreate} style={{
                        ...btnStyle('#3b82f6', 15),
                        padding: '10px 20px', borderRadius: 10,
                    }}>追加</button>
                </div>
                {createErr && <div style={{ color: '#f87171', fontSize: 13, marginBottom: 8 }}>{createErr}</div>}

                {/* Filter tabs */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                    {filters.map((f) => (
                        <button key={f.value} onClick={() => setFilter(f.value)} style={{
                            background: filter === f.value ? '#3b82f6' : '#1e293b',
                            color: filter === f.value ? '#fff' : '#94a3b8',
                            border: 'none', borderRadius: 999,
                            padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                            transition: 'all .15s',
                        }}>
                            {f.label} <span style={{ opacity: 0.7 }}>({counts[f.value]})</span>
                        </button>
                    ))}
                </div>

                {/* Error / Loading */}
                {error && <div style={{ color: '#f87171', marginBottom: 12, fontSize: 14 }}>⚠ {error}</div>}
                {loading && <div style={{ color: '#64748b', textAlign: 'center', padding: 40 }}>読み込み中...</div>}

                {/* Todo list */}
                {!loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {todos.length === 0 && (
                            <div style={{ color: '#475569', textAlign: 'center', padding: 40, fontSize: 14 }}>
                                Todoがありません
                            </div>
                        )}
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onChangeStatus={(action) => changeStatus(todo.id, action)}
                                onUpdateTitle={(title) => updateTitle(todo.id, title)}
                                onDelete={() => remove(todo.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
