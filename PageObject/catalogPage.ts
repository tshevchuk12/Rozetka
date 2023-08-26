import { Page} from "@playwright/test";
import { mainPageSelectors } from "../Selectors/mainPageSelectors";

const createCatalogPage = (page:Page) => {
    const catalogPage = {
        openCatalogPage: () => page.goto("https://rozetka.com.ua/ua/notebooks/c80004/"),
        getProductCardLableFirstClassNameList: async() => {
            const productLableItems = await page.$$(mainPageSelectors.PRODUCT_LABLE_ITEMS);
            const productCardLableClassNames = await Promise.all(productLableItems.map((card) => card.getAttribute("class")));
            const firstClassNameList = productCardLableClassNames.map((className)=> className?.split(" ")[0]);
            return firstClassNameList
        }
    }
    return catalogPage
}

export {createCatalogPage}