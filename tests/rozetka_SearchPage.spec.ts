import{test, expect, Page} from '@playwright/test'
import { createMainPage } from '../PageObject/mainPage'
import { createSearchPage } from '../PageObject/searchPage'


//Parameterized test 
const dataForSearch = [{text:"Lenovo",test:1}, {text:"Acer",test:2}, {text:"Nokia",test:3}, {text:"JBL",test:4}, {text:"LG",test:5}]

dataForSearch.forEach((data) => {
    test(`Search for ${data.test}`, async ({page})=>{
        const mainPage = createMainPage(page);
        const searchPage = createSearchPage(page);
        await mainPage.openMainPage();
        await searchPage.setSearchData(data.text);
        await page.keyboard.press("Enter", {"delay":100});
        const searchPageHeader = await searchPage.getSearchPageHeader()

    
        expect(searchPageHeader).toContain("Результати пошуку");
        expect(searchPageHeader).toContain(`${data.text}`)

        
    })
})