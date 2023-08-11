import {test,expect, Page} from '@playwright/test'
import { createMainPage } from '../PageObject/mainPage'

//It would be a positive login case if I knew how to pass the captcha(
test("Captcha failed during login", async({page}) => {
    const mainPage = createMainPage(page);

    await mainPage.openMainPage();
    expect(page).toHaveTitle("Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні");
    
    await mainPage.loginForm.openLoginForm();
    const loginFormHeaderText = await mainPage.loginForm.getLoginFormHeaderText();
    expect(loginFormHeaderText).toEqual(" Вхід");
    
    await mainPage.loginForm.setLogin("test12@gmail.com");
    await mainPage.loginForm.setPassword("test12");
    await mainPage.pressEnter();
   
    const captchaErrorText = await mainPage.getErrorText.captchaError();
    expect(captchaErrorText).toEqual("Необхідно підтвердити, що ви не робот");
   
});

//Check if the password is shown in the login form after clicking the "Show password" button 
test("ShowPassword button displays a password", async({page}) => {
    const mainPage = createMainPage(page);
    
    await mainPage.openMainPage();
    await mainPage.loginForm.openLoginForm();

    await mainPage.loginForm.setPassword("test12");

    const passwordStatusBefore = await mainPage.loginForm.getPasswordStatus();
    expect (passwordStatusBefore).toContain('password');

    await mainPage.loginForm.clickPasswordToggleButton();

    const passwordStatusAfter = await mainPage.loginForm.getPasswordStatus();
    expect (passwordStatusAfter).toContain('text');

});

//Check if the number of visible products in the section is increased on the main page after clicking the "Show more" button 
test("ShowMore button increases visible products", async({page}) => {
    const mainPage = createMainPage(page);
    
    await mainPage.openMainPage();

    const productElementsBefore = await mainPage.getProductElementsInSection();

    const buttonName = await mainPage.getButtonName();
    expect(buttonName?.trim()).toEqual('Показати ще');

    await mainPage.clickShowMoreButton();

    const productElementsAfter = await mainPage.getProductElementsInSection();
    expect(productElementsAfter.length).toBeGreaterThan(productElementsBefore.length);
    
});

//Check if all required elements are presented in the product card on the catalog page
test("Product card elements in catalog", async({page}) => {
    const mainPage = createMainPage(page);

    await mainPage.openCatalogPage();

    const firstClassNameList = await mainPage.getProductCardLableFirstClassNameList();
    
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


//check the validation of the Email field in the Registration form
test("Email field validation in the Registration form", async ({page}) => {
    const mainPage = createMainPage(page);
    await mainPage.openMainPage();
        
    await mainPage.loginForm.openLoginForm();
    await mainPage.registrationForm.openRegistrationForm();
    const registrationFormHeader = await mainPage.registrationForm.getRegistrationFormHeader();
    expect(registrationFormHeader).toEqual("Реєстрація");
    
    
    await mainPage.insertDataInTheRegistrationForm(page, "Тетяна", "Шевчук", "09859860", "12QAtest");
    
    const invalidEmailDataList = mainPage.invalidEmailDataList;
    await mainPage.checkEmailFieldValidation(invalidEmailDataList);
    
});