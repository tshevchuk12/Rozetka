import { Page } from "@playwright/test";

    const utility = {
     clearAndType: async(page:Page, fieldSelector:string,textToType:string ) =>{
        await page.click(fieldSelector);
        await page.type(fieldSelector,"");
        await page.type(fieldSelector,textToType)
        }
}

export {utility}