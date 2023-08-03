import {test,expect} from '@playwright/test'

//It would be a positive login case if I knew how to pass the captcha(
test("logInFormCapchaError", async({page}) => {
    await page.goto("https://rozetka.com.ua/ua/");
    expect(page).toHaveTitle("Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні");
    
    await page.click('.header-actions__item.header-actions__item--user');
    const headerText = await page.textContent('h3.modal__heading');
    expect(headerText).toEqual(" Вхід");
    
    await page.click('[id="auth_email"]');
    await page.type('[id="auth_email"]',"test12@gmail.com");
    await page.click('[id="auth_pass"]');
    await page.type('[id="auth_pass"]',"test12");
    await page.keyboard.press("Enter", {"delay":100});
   
    const errorText = await page.textContent('.error-message_color_red');
    expect(errorText).toEqual("Необхідно підтвердити, що ви не робот");
   
});

//Check if the password is shown in the login form after clicking the "Show password" button 
test("loginFormShowPasswordButton", async({page}) => {
    await page.goto("https://rozetka.com.ua/ua/");
    await page.click('.header-actions__item.header-actions__item--user');

    await page.click('[id="auth_pass"]');
    await page.type('[id="auth_pass"]',"QATest");

    const statusPasswordBefore = await page.getAttribute('#auth_pass', 'type');
    expect (statusPasswordBefore).toContain('password');

    await page.click('.button_type_link.form__toggle-password');

    const statusPasswordAfter = await page.getAttribute('#auth_pass', 'type');
    expect (statusPasswordAfter).toContain('text');

});

//Check if the number of visible products in the section is increased on the main page after clicking the "Show more" button 
test("mainPageShowMoreButton", async({page}) => {
    await page.goto("https://rozetka.com.ua/ua/");

    const quantityOfGoodsBefore = await page.$$('section:nth-child(2) .ng-star-inserted .main-goods__cell');

    const buttonName = await page.textContent('section:nth-child(2) button:last-child.main-goods__show-more');
    expect(buttonName).toEqual(' Показати ще ');
    await page.click('section:nth-child(2) button:last-child.main-goods__show-more');

    const quantityOfGoodsAfter = await page.$$('section:nth-child(2) .ng-star-inserted .main-goods__cell');
    expect(quantityOfGoodsAfter.length).toEqual(quantityOfGoodsBefore.length * 4);
    
});

//Check if all required elements are presented in the product card on the catalog page
test("productCardInCatalog", async({page}) => {
    await page.goto("https://rozetka.com.ua/ua/");
    await page.click('.menu-categories.menu-categories_type_main li:first-child');
    const categoryHeader = await page.textContent('.ng-star-inserted .portal__heading');
    expect(categoryHeader).toEqual("Комп'ютери та ноутбуки");
    await page.click('rz-dynamic-widgets rz-widget-producer+rz-widget-list .portal-grid.portal-grid_type_1_6 li:first-child');
    const catalogHeader = await page.textContent('div .ng-star-inserted h1');
    expect(catalogHeader).toEqual("Ноутбуки");

    const productCard = await page.$$('.catalog-grid .catalog-grid__cell:first-child .goods-tile__inner>div, .catalog-grid__cell:first-child .goods-tile__inner>a, .catalog-grid__cell:first-child .goods-tile__inner>span');
    expect(productCard.length).toEqual(10);

    const productCardItems = await Promise.all(productCard.map(
        async (productCard)=>{ 
            const classNames = await productCard.getAttribute("class");
            const firstClassName = classNames.split(" ")[0];
            return firstClassName;

    }));
    expect(productCardItems).toEqual(["goods-tile__label","goods-tile__actions","goods-tile__picture","goods-tile__colors","goods-tile__heading","goods-tile__rating","goods-tile__prices","goods-tile__availability","goods-tile__promo","goods-tile__hidden-holder"])
});

//check the validation of the Email field in the Registration form
test("checkEmailFieldInRegistrationForm", async ({page}) => {
    await page.goto("https://rozetka.com.ua/ua/");
        
    await page.click('.header-actions__item.header-actions__item--user');
    const registrationButtonName = await page.innerText('.auth-modal__register-link.button.button--link');
    expect(registrationButtonName).toEqual("Зареєструватися");

    await page.click('.auth-modal__register-link.button.button--link');
    const registrationFormHeader = await page.innerText('h3.modal__heading');
    expect(registrationFormHeader).toEqual("Реєстрація");

    const data = {
        '#registerUserName': "Тетяна",
        '#registerUserSurname': "Шевчук",
        '#registerUserPhone': "09859860",
        '#registerUserPassword': "12QAtest"
    };

    for (const [selector, value] of Object.entries(data)) {
    await page.type(selector, value);
    };

    const arrayInvalidData = ["12@gmailcom", "@gmail.com", "куа@gmail.com", "12testgmail.com", "   ", " 12@gmailcom"];
    
    const errorMess = [];
    for (const data of arrayInvalidData) {
    await page.fill('#registerUserEmail', ''); // Очищаємо поле перед вставкою нового значення
    await page.type('#registerUserEmail', data);
    await page.click('.button.button--large.button--green.auth-modal__submit');
    const errorMessageText = await page.innerText('.form__row.ng-star-inserted .validation-message.ng-star-inserted');
    errorMess.push(errorMessageText);
    }
    expect(errorMess).toEqual(["Введіть свою ел. пошту", "Введіть свою ел. пошту", "Введіть свою ел. пошту", "Введіть свою ел. пошту", "Введіть свою ел. пошту", "Введіть свою ел. пошту"])
   
    // const errorMess = await Promise.all(arrayInvalidData.map(
    //     async (data)=>{ 
    //         await page.fill('#registerUserEmail', '');
    //         await page.type('#registerUserEmail',data);
    //         await page.click('.button.button--large.button--green.auth-modal__submit');
    //         const errorMessageText = page.innerText('.form__row.ng-star-inserted .validation-message.ng-star-inserted');
    //         return errorMessageText;
    //         }));

})