import { test, expect } from '@playwright/test';

test('Input test', async ({ page }) => {
    await page.goto(`${__dirname}/test_target_1.html`);

    await page.locator('#input-text').fill('ABC');  // ABC と入力する。すぐには反映されません
    await page.locator('#input-button').click();  // 出力をチェックする。すぐには反映されません
    await expect(page.locator('#result')).toHaveText('abc');  // 出力をチェックする
    await expect(page.locator('#input-text')).toHaveValue('ABC');  // input タグの場合
});
