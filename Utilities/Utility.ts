import { Page } from "@playwright/test";

const createUtilities = (page:Page) => {
    const utility = {
    clearAndType: async(fieldSelector:string,textToType:string ) =>{
        await page.click(fieldSelector);
        await page.type(fieldSelector,"");
        await page.type(fieldSelector,textToType)
        }
    }
    return utility
}

export {createUtilities}