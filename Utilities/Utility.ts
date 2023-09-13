import { Page, ElementHandle } from "@playwright/test";

    const utility = {
    //  clearAndType: async(page:Page, fieldSelector:string,textToType:string ) =>{
    //     await page.click(fieldSelector);
    //     await page.type(fieldSelector,"");
    //     await page.type(fieldSelector,textToType)
    //     }

        clearAndType: async(page:Page, field: any, textToType:string ) =>{
           
            if ( typeof field === "string") {
                await page.click(field);
                await page.type(field,"");
                await page.type(field,textToType)
                } 
                else if( typeof field !== "string") {
                    await field.type("");
                    await field.type(textToType)
                }
}
}

export {utility}