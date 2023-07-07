import { test, expect } from '@playwright/test';

test('Others test', async ({ page }) => {
    await page.goto(`${__dirname}/others.html`);

    await expect(page.locator('a')).toHaveAttribute('href', '/users');
    expect(await page.locator('img').getAttribute('src')).toContain('part');
    expect(await page.locator('img').getAttribute('src')).toMatch(/part[0-9]/);
    await page.waitForFunction(() => getComputedStyle(document.querySelector('#element')!).display === 'none');
    await page.waitForSelector('#add');
    if (process.env.MANUAL_TEST) {
        debugger;
    }
});
