import { ElementHandle,expect, Page } from "@playwright/test"
import {mainPageSelectors} from "../Selectors/mainPageSelectors"

const createMainPage = (page: Page) => {
    const mainPage = {
        openMainPage: () => page.goto('https://rozetka.com.ua/ua/'),
        loginForm: {
            openLoginForm: () => page.click(mainPageSelectors.LOGINBUTTON),
            getLoginFormHeaderText: () => page.textContent(mainPageSelectors.LOGINFORMHEADER), 
            setLogin: async (email:string) => {
                await page.click(mainPageSelectors.EMAILFIELD);
                await page.type(mainPageSelectors.EMAILFIELD,email);
            },
            setPassword: async (password:string) =>  {
                await page.click(mainPageSelectors.PASSWORDFIELD);
                await page.type(mainPageSelectors.PASSWORDFIELD, password);
            },
            getPasswordStatus: () => page.getAttribute(mainPageSelectors.PASSWORDFIELD, 'type'),
            clickPasswordToggleButton: () => page.click(mainPageSelectors.PASSWORDTOGGLEBUTTON)
        },
        registrationForm: {
            openRegistrationForm:  () => page.click(mainPageSelectors.REGISTRATIONBUTTON),
            getRegistrationFormHeader: () => page.innerText(mainPageSelectors.REGISTRATIONFORMHEADER)
         },
        pressEnter: () => page.keyboard.press("Enter", {"delay":100}),
        clickShowMoreButton: () => page.click(mainPageSelectors.SHOWMOREBUTTON),
        getButtonName: () => page.textContent(mainPageSelectors.SHOWMOREBUTTON),
        getProductElementsInSection: () => page.$$(mainPageSelectors.PRODUCTELEMENTSINSECTION),
        getErrorText: {
            captchaError: () => page.textContent(mainPageSelectors.CAPTCHAERRORTEXT)
        },    
        openCatalogPage: () => page.goto("https://rozetka.com.ua/ua/notebooks/c80004/"),
        getProductCardLableFirstClassNameList: async() => {
            const productLableItems = await page.$$(mainPageSelectors.PRODUCTLABLEITEMS);
            const productCardLableClassNames = await Promise.all(productLableItems.map((card) => card.getAttribute("class")));
            const firstClassNameList = productCardLableClassNames.map((className)=> className?.split(" ")[0]);
            return firstClassNameList
        },
        insertDataInTheRegistrationForm: async (page:Page,userName:string, userSurname:string,userPhone:string, userPassword:string) => {
            await page.type(mainPageSelectors.USERNAMEFIELD, userName);
            await page.type(mainPageSelectors.USERSURNAMEFIELD, userSurname);
            await page.type(mainPageSelectors.USERPHONEFIELD, userPhone);
            await page.type(mainPageSelectors.USERPASSWORDFIELD, userPassword);
        },
        invalidEmailDataList: ["12@gmailcom", "@gmail.com", "куа@gmail.com", "12testgmail.com", "   ", " 12@gmailcom"],
        checkEmailFieldValidation: async (invalidEmailDataList: string[]) => {
            for (const data of invalidEmailDataList) {
                await page.fill(mainPageSelectors.USEREMAILFIELD, ''); 
                await page.type(mainPageSelectors.USEREMAILFIELD, data);
                await page.click(mainPageSelectors.SUBMITREGISTRATIONBUTTON);
                const errorMessageText = await page.innerText(mainPageSelectors.EMAILVALIDATIONERRORTEXT);
                expect(errorMessageText).toEqual("Введіть свою ел. пошту")
                }
        }
    }
return mainPage
}

export { createMainPage }