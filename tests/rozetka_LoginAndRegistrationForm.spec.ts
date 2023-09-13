import {test, expect, Page} from '@playwright/test'
import { createLoginForm } from '../PageObject/loginAndRegistrationForm'
import { createRegistrationForm } from '../PageObject/loginAndRegistrationForm'
import { registrationFormSelectors } from "../Selectors/loginAndRegistrationFormSelectors"
import {utility} from "../Utilities/Utility"


//Check utility with Element
test.only("Check utility with Element", async ({page})=> {
    const loginForm = createLoginForm(page);
    await loginForm.openLoginForm();
    const fields = await page.$$('.form__row input');
    await utility.clearAndType(page, fields[0], "Text");
    await page.keyboard.press("Enter", {"delay":100});
    const errorText = await page.innerText('.error-message.ng-star-inserted')
    expect(errorText).toEqual('Введено невірну адресу ел. пошти або номер телефону')


})

//It would be a positive login case if I knew how to pass the captcha(
    test("Captcha failed during login", async({page}) => {
        const loginForm = createLoginForm(page);
    
        expect(page).toHaveTitle("Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні");
        
        await loginForm.openLoginForm();
        const loginFormHeaderText = await loginForm.getLoginFormHeaderText();
        expect(loginFormHeaderText).toContain("Вхід");
        
        await loginForm.setLogin("test12@gmail.com");
        await loginForm.setPassword("test12");
        await page.keyboard.press("Enter", {"delay":100});
       
        const captchaErrorText = await loginForm.getErrorText.captchaError();
        expect(captchaErrorText).toEqual("Необхідно підтвердити, що ви не робот");
       
    });
    
    //Check if the password is shown in the login form after clicking the "Show password" button 
    test("ShowPassword button displays a password", async({page}) => {
        const loginForm = createLoginForm(page);
        
        await loginForm.openLoginForm();
    
        await loginForm.setPassword("test12");
        //await loginForm.clickPasswordToggleButton();
        const passwordStatusBefore = await loginForm.getPasswordStatus();
        
        if(passwordStatusBefore === 'password'){
            await loginForm.clickPasswordToggleButton()
        }else if(passwordStatusBefore === 'text'){
            throw new Error ('Password Status Before should be invisible')
        }
    
        const passwordStatusAfter = await loginForm.getPasswordStatus();
        expect (passwordStatusAfter).toContain('text');
        
        //Sasha's variant
        // await mainPage.loginForm.setPassword("test12");
        
        // const passwordStatusBefore = await mainPage.loginForm.getPasswordStatus();
        // expect (passwordStatusBefore).toContain('password')
    
        // await mainPage.loginForm.togglePasswordVisibility(true);
    
        // const passwordStatusAfter = await mainPage.loginForm.getPasswordStatus();
        // expect (passwordStatusAfter).toContain('text');
    
    });

    const checkEmailFieldValidation = async (page: Page,  invalidEmailDataList: string[]) => {
        const registrationForm = createRegistrationForm(page);
        for (const invalidEmail of invalidEmailDataList) {
            await registrationForm.acceptEmail(invalidEmail);
            const errorMessageText = await page.innerText(registrationFormSelectors.EMAIL_VALIDATION_ERROR_TEXT);
            expect(errorMessageText).toEqual("Введіть свою ел. пошту")
            }
    }
    
    //check the validation of the Email field in the Registration form
    test("Email field validation in the Registration form", async ({page}) => {
        const registrationForm = createRegistrationForm(page);
    
        await registrationForm.openRegistrationForm();
        const registrationFormHeader = await registrationForm.getRegistrationFormHeader();
        expect(registrationFormHeader).toEqual("Реєстрація");
        
        
        await registrationForm.insertDataIntoRegistrationForm(page, "Тетяна", "Шевчук", "0940758759", "12QAtest");
        
        const invalidEmailDataList = ["12@gmailcom", "@gmail.com", "куа@gmail.com", "12testgmail.com", "   ", " 12@gmailcom"];
        await checkEmailFieldValidation(page,invalidEmailDataList);
        
    });

