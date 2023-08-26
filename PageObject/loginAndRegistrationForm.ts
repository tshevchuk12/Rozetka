import { Page} from "@playwright/test";
import { mainPageSelectors } from "../Selectors/mainPageSelectors";
import {createUtilities} from "../Utilities/Utility"

const createLoginForm = (page : Page) => {
    const utility = createUtilities(page)
    const loginForm ={   
        openLoginForm: async() => {
            await page.goto('https://rozetka.com.ua/ua/')
            await page.click(mainPageSelectors.LOGIN_BUTTON)
        },
        getLoginFormHeaderText: () => page.textContent(mainPageSelectors.LOGIN_FORM_HEADER), 
        setLogin: async (email:string) => {
            await utility.clearAndType(mainPageSelectors.EMAIL_FIELD,email)
        },
        setPassword: async(password:string)=> {
            await utility.clearAndType(mainPageSelectors.PASSWORD_FIELD,password) 
        },
        getErrorText: {
        captchaError: () => page.textContent(mainPageSelectors.CAPTCHA_ERROR_TEXT)
        },
        getPasswordStatus: () => page.getAttribute(mainPageSelectors.PASSWORD_FIELD, 'type'),
        isPasswordVisible : async () => {
            const statusText = await loginForm.getPasswordStatus();
                if(statusText ==='password'){
                    return false
                }else if (statusText ==='text') {
                    return true
                } else {
                    throw new Error ("Password status not found")
        }},
        clickPasswordToggleButton: () => page.click(mainPageSelectors.PASSWORD_TOGGLE_BUTTON),
        togglePasswordVisibility: async(expectedStatus: boolean) =>{
            const status = await loginForm.isPasswordVisible();
                if (status !== expectedStatus){
                    await loginForm.clickPasswordToggleButton()
            }}
    }
    return loginForm
}

const createRegistrationForm = (page:Page) => {
    const utility = createUtilities(page)
    const registrationForm ={
        openRegistrationForm:  async() => {
            await page.goto('https://rozetka.com.ua/ua/'),
            await page.click(mainPageSelectors.LOGIN_BUTTON),
            await page.click(mainPageSelectors.REGISTRATION_BUTTON)
        },
        getRegistrationFormHeader: () => page.innerText(mainPageSelectors.REGISTRATION_FORM_HEADER),  
        insertDataIntoRegistrationForm: async (page:Page,userName:string, userSurname:string,userPhone:string, userPassword:string) => {
            await utility.clearAndType(mainPageSelectors.USER_NAME_FIELD, userName);
            await utility.clearAndType(mainPageSelectors.USER_SURNAME_FIELD, userSurname);
            await utility.clearAndType(mainPageSelectors.USER_PHONE_FIELD, userPhone);
            await utility.clearAndType(mainPageSelectors.USER_PASSWORD_FIELD, userPassword);
        },
        acceptEmail: async (emilToInsert:string) => {
            await utility.clearAndType(mainPageSelectors.USER_EMAIL_FIELD, emilToInsert);
            await page.click(mainPageSelectors.SUBMIT_REGISTRATION_BUTTON);
        }}
    return registrationForm
}

export {createLoginForm}
export {createRegistrationForm}