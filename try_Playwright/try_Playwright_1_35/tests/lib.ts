import { Page, Locator } from '@playwright/test';

export async function  getRowIndex(page: Page, td: Locator): Promise<number> {
    const  attributeName = 'data-index';  // HTML element data- attribute name reserved by this function
    const  trs = (await td.locator('xpath=../..').locator('tr').elementHandles())!;  // ../../tr HTML tags
    await page.evaluate(({trs, attributeName}: {trs: any, attributeName: string}) => {
        for (let i = 0; i < trs.length; i+=1) {

            trs[i].setAttribute(attributeName, i);
        }
    }, {trs, attributeName});
    const  tr = (await td.locator('xpath=..').elementHandle())!;  // A parent of td HTML tag

    const  attribute = await tr.getAttribute(attributeName);
    if (!attribute) {
        return  -1;
    }

    return  parseInt(attribute);
}
