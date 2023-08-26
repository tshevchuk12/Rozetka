import {test,expect, Page, ElementHandle} from '@playwright/test'
import { createMainPage } from '../PageObject/mainPage'
import {mainPageSelectors} from "../Selectors/mainPageSelectors"
import { createCatalogPage } from '../PageObject/catalogPage';
import { createLoginForm } from '../PageObject/loginAndRegistrationForm';
import { createRegistrationForm } from '../PageObject/loginAndRegistrationForm';

//It would be a positive login case if I knew how to pass the captcha(
test("Captcha failed during login", async({page}) => {
    const loginForm = createLoginForm(page);

    await loginForm.openLoginForm();
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
    //await mainPage.loginForm.clickPasswordToggleButton();
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


    //first variant
    // const passwordStatusBefore = await mainPage.loginForm.getPasswordStatus();
    // expect (passwordStatusBefore).toContain('password');

    // await mainPage.loginForm.clickPasswordToggleButton();

    // const passwordStatusAfter = await mainPage.loginForm.getPasswordStatus();
    // expect (passwordStatusAfter).toContain('text');

});

//Check if the number of visible products in the section is increased on the main page after clicking the "Show more" button 
test("ShowMore button increases visible products", async({page}) => {
    const mainPage = createMainPage(page);
    
    await mainPage.openMainPage();
    const firstSectionElementsBefore = await mainPage.getFirstProductSectionElements();
    
    const buttonName = await mainPage.showMoreButton.getName();
    expect(buttonName).toContain('Показати ще');

    await  mainPage.showMoreButton.click();   
    
    const firstSectionElementsAfter = await mainPage.getFirstProductSectionElements();
    expect(firstSectionElementsAfter.length).toBeGreaterThan(firstSectionElementsBefore.length);
      
});

test("Each product section contains a ShowMore button on the main page",async({page}) => {
    const mainPage = createMainPage(page);
    
    await mainPage.openMainPage();

    while((await mainPage.getProductSectionsList()).length != 10){
        await mainPage.scrollMainPageDown();
    }

    const productSectionsList = await mainPage.getProductSectionsList()
    expect(productSectionsList.length).toEqual(10);
    const lastProductSectionTitle = await productSectionsList[9].innerText();
    expect(lastProductSectionTitle).toContain('Зараз користуються попитом');

    const showMoreButtonList = await mainPage.getShowMoreButtonList();
    expect(showMoreButtonList.length).toEqual(productSectionsList.length)
  });



//Check if all required elements are presented in the product card on the catalog page
test("Product card should contain all elements in catalog page", async({page}) => {
    const catalogPage = createCatalogPage(page);

    await catalogPage.openCatalogPage();

    const firstClassNameList = await catalogPage.getProductCardLableFirstClassNameList();
    
    expect(firstClassNameList).toContain("goods-tile__label");
    expect(firstClassNameList).toContain("goods-tile__actions");
    expect(firstClassNameList).toContain("goods-tile__picture");
    expect(firstClassNameList).toContain("goods-tile__colors");
    expect(firstClassNameList).toContain("goods-tile__heading");
    expect(firstClassNameList).toContain("goods-tile__rating");
    expect(firstClassNameList).toContain("goods-tile__prices");
    expect(firstClassNameList).toContain("goods-tile__availability");
    expect(firstClassNameList).toContain("goods-tile__promo");
    expect(firstClassNameList).toContain("goods-tile__hidden-holder")
    
});



const checkEmailFieldValidation = async (page: Page,  invalidEmailDataList: string[]) => {
    const registrationForm = createRegistrationForm(page);
    for (const invalidEmail of invalidEmailDataList) {
        await registrationForm.acceptEmail(invalidEmail);
        const errorMessageText = await page.innerText(mainPageSelectors.EMAIL_VALIDATION_ERROR_TEXT);
        expect(errorMessageText).toEqual("Введіть свою ел. пошту")
        }
}

//check the validation of the Email field in the Registration form
test("Email field validation in the Registration form", async ({page}) => {
    const registrationForm = createRegistrationForm(page);

    await registrationForm.openRegistrationForm();
    const registrationFormHeader = await registrationForm.getRegistrationFormHeader();
    expect(registrationFormHeader).toEqual("Реєстрація");
    
    
    await registrationForm.insertDataIntoRegistrationForm(page, "Тетяна", "Шевчук", "09859860", "12QAtest");
    
    const invalidEmailDataList = ["12@gmailcom", "@gmail.com", "куа@gmail.com", "12testgmail.com", "   ", " 12@gmailcom"];
    await checkEmailFieldValidation(page,invalidEmailDataList);
    
});