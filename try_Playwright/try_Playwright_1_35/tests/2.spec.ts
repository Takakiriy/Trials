import { test, expect, Page } from '@playwright/test';
import { getRowIndex } from './lib';

let  page:Page;

test.beforeAll(async ({ browser }) => {
    // ページをここで作ります。
    // 各テストを実行する前に blank ページに戻らなくなります。
    // できれば、各テストを実行する前に blank ページに戻し、beforeEach で page.goto してください。
    page = await browser.newPage();

    await page.goto(`${__dirname}/test_target_2.html`);
});

test.beforeEach(async () => {
});

test('check box test', async () => {
    await page.locator('#input-check').click()
    await expect(page.locator('#input-check')).toBeChecked();  // .not.toBeChecked
});

test('drop down list test', async () => {
    await page.locator('#input-drop-down').selectOption('b');
    await expect(page.locator('#input-drop-down')).toHaveValue('b');
});

test('Table test', async () => {
    const  td = page.locator('#result-table  td:has-text("B")');
    const  iRow = await getRowIndex(page, td);
    await expect(page.locator(`#table-value-${iRow}`)).toHaveText('200');
});

test.afterEach(async () => {
});

test.afterAll(async () => {
    await page.close();
});
