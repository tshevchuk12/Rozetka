import { ElementHandle,expect, Page } from "@playwright/test"
import {mainPageSelectors} from "../Selectors/mainPageSelectors"

const createMainPage = (page: Page) => {
    const mainPage = {
        openMainPage: () => page.goto('https://rozetka.com.ua/ua/'),
        scrollMainPageDown:() => page.mouse.wheel(1688, 4786.080),

        getProductSectionsList: () => page.$$(mainPageSelectors.PRODUCT_ELEMENTS_LIST),
        
        getFirstProductSectionElements: async() => {
            const [firstSection]= await mainPage.getProductSectionsList(); 
            const firstSectionElements = await firstSection.$$(mainPageSelectors.PRODUCT_ELEMENTS_IN_SECTION);
            return firstSectionElements
        },
        showMoreButton: {
            getFirstSectionButton: async() => {
                const [firstSection]= await mainPage.getProductSectionsList(); 
                const showMoreButton = await firstSection.$(mainPageSelectors.SHOW_MORE_BUTTON);
                return showMoreButton
            },
            getName: async() => {
                const showMoreButton = await mainPage.showMoreButton.getFirstSectionButton()
                const buttonName = await showMoreButton?.innerText();
                return buttonName
            },
            click: async() => {
                const showMoreButton = await mainPage.showMoreButton.getFirstSectionButton()
                await showMoreButton?.click()
            }
            
        },
        getShowMoreButtonList: async() => {
            const productSectionsList = await mainPage.getProductSectionsList();
            const showMoreButtonList = await Promise.all(productSectionsList.map(async(showMoreButtonElement) => {
            const showMoreButtonInSection = await showMoreButtonElement.$(mainPageSelectors.SHOW_MORE_BUTTON);
            const buttonName = await showMoreButtonInSection?.innerText();
            return buttonName
            }))
        return showMoreButtonList     
        },  
        scrollToLastElement:  async (expectedItemsLength:number) => {
            const productElements = await mainPage.getProductSectionsList();
        if (productElements.length !== expectedItemsLength){
            await mainPage.scrollMainPageDown();
            await mainPage.scrollToLastElement(expectedItemsLength)
        }
        }   
        
    }
return mainPage
}

export { createMainPage }