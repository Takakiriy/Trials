import { expect, test } from '@playwright/test';

test('ToDoを作成してステータスを完了にして削除できる', async ({ page }) => {
    await page.goto('/');

    // ── 1. ToDo を作成する ──────────────────────────────────────────
    const input = page.getByPlaceholder('新しいTodoを追加...');
    await input.fill('E2Eテスト用タスク');
    await page.getByRole('button', { name: '追加' }).click();

    // 作成した ToDo が「未着手」として表示されていること
    const todoItem = page.locator('[data-testid="todo-item"]').filter({ hasText: 'E2Eテスト用タスク' });
    await expect(todoItem.getByText('未着手', { exact: true })).toBeVisible();

    // ── 2. ステータスを「進行中」にする ────────────────────────────
    await todoItem.getByRole('button', { name: '開始' }).click();
    await expect(todoItem.getByText('進行中')).toBeVisible();

    // ── 3. ステータスを「完了」にする ──────────────────────────────
    await todoItem.getByRole('button', { name: '完了にする' }).click();
    await expect(todoItem.getByText('完了')).toBeVisible();

    // ── 4. ToDo を削除する ──────────────────────────────────────────
    await todoItem.getByTitle('削除').click();

    // 削除後はリストから消えていること
    await expect(page.getByText('E2Eテスト用タスク')).not.toBeVisible();
});
