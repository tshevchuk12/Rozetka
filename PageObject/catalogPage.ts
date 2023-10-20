import { Page} from "@playwright/test";
import { catalogPageSelectors } from "../Selectors/catalogPageSelectors";

const createCatalogPage = (page:Page) => {
    const catalogPage = {
        openCatalogPage: () => page.goto("https://rozetka.com.ua/ua/notebooks/c80004/"),
        getProductCardLableFirstClassNameList: async() => {
            const productLableItems = await page.$$(catalogPageSelectors.PRODUCT_LABLE_ITEMS);
            const productCardLableClassNames = await Promise.all(productLableItems.map((card) => card.getAttribute("class")));
            const firstClassNameList = productCardLableClassNames.map((className)=> className?.split(" ")[0]);
            return firstClassNameList
        },
        getProductItemsList: async() => {
            const productItems = await page.$$(catalogPageSelectors.PRODUCT_ITEMS_LIST)
            return productItems
        },
        clickShowMoreButton: async() => {
            await page.click(catalogPageSelectors.SHOW_MORE_BUTTON)
        },
        // getExpectedGoodsQuantity: async(expectedGoodsQuantity: number) => {
        //     const goodsQuantity = (await catalogPage.getProductItemsList()).length;
        // if (goodsQuantity < 200){
        //     await page.waitForTimeout(3000)
        //     await page.click(catalogPageSelectors.SHOW_MORE_BUTTON)
        //     await catalogPage.getExpectedGoodsQuantity(expectedGoodsQuantity)
        // }},
        getExpectedProductsQuantity: async (expectedProductsQuantity: number) => {
            const productQuantity = await page.$$eval(catalogPageSelectors.PRODUCT_ITEMS_LIST, (el) => {return el.length});
            if (productQuantity < 200) {
                await page.waitForTimeout(3000);
                await page.evaluate((sel)=>{
                    const button = document.querySelector(sel);
                    //@ts-ignore
                    button.click()
                },catalogPageSelectors.SHOW_MORE_BUTTON)
                await catalogPage.getExpectedProductsQuantity(expectedProductsQuantity)
            }
        }
    }
    return catalogPage
}

export {createCatalogPage}