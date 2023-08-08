import {test,expect, Page} from '@playwright/test'

//It would be a positive login case if I knew how to pass the captcha(
test("Captcha failed during login", async({page}) => {
    await page.goto("https://rozetka.com.ua/ua/");
    expect(page).toHaveTitle("Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні");
    
    await page.click('.header-actions__item.header-actions__item--user');
    const loginFormHeaderText = await page.textContent('h3.modal__heading');
    expect(loginFormHeaderText).toEqual(" Вхід");
    
    await page.click('#auth_email');
    await page.type('#auth_email',"test12@gmail.com");
    await page.click('#auth_pass');
    await page.type('#auth_pass',"test12");
    await page.keyboard.press("Enter", {"delay":100});
   
    const captchaErrorText = await page.textContent('.error-message_color_red');
    expect(captchaErrorText).toEqual("Необхідно підтвердити, що ви не робот");
   
});

//Check if the password is shown in the login form after clicking the "Show password" button 
test("ShowPassword button displays a password", async({page}) => {
    await page.goto("https://rozetka.com.ua/ua/");
    await page.click('.header-actions__item.header-actions__item--user');

    await page.click('#auth_pass');
    await page.type('#auth_pass',"QATest");

    const passwordStatusBefore = await page.getAttribute('#auth_pass', 'type');
    expect (passwordStatusBefore).toContain('password');

    await page.click('.button_type_link.form__toggle-password');

    const passwordStatusAfter = await page.getAttribute('#auth_pass', 'type');
    expect (passwordStatusAfter).toContain('text');

});

//Check if the number of visible products in the section is increased on the main page after clicking the "Show more" button 
test("ShowMore button increases visible products", async({page}) => {
    await page.goto("https://rozetka.com.ua/ua/");

    const productElementsBefore = await page.$$('section:nth-child(2) .ng-star-inserted .main-goods__cell');

    const buttonName = await page.textContent('section:nth-child(2) button:last-child.main-goods__show-more');
    expect(buttonName?.trim()).toEqual('Показати ще');
    await page.click('section:nth-child(2) button:last-child.main-goods__show-more');

    const productElementsAfter = await page.$$('section:nth-child(2) .ng-star-inserted .main-goods__cell');
    expect(productElementsAfter.length).toBeGreaterThan(productElementsBefore.length);
    
});

//Check if all required elements are presented in the product card on the catalog page
test("Product card elements", async({page}) => {
    await page.goto("https://rozetka.com.ua/ua/notebooks/c80004/");

    // const productLableItems = await page.$$('.catalog-grid .catalog-grid__cell:first-child .goods-tile__inner>div, .catalog-grid__cell:first-child .goods-tile__inner>a, .catalog-grid__cell:first-child .goods-tile__inner>span');
    // expect(productLableItems.length).toEqual(10);

    // const productCardItems = await Promise.all(productLableItems.map(
    //     async (productCard)=>{ 
    //         const classNames = await productCard.getAttribute("class");
    //         if (classNames ===null){
    //             throw new Error('classNames are not found')
    //         }
    //         const firstClassNamesList = classNames.split(" ")[0];
    //         return firstClassNamesList;
    //}));

    const productLableItems = await page.$$('.catalog-grid .catalog-grid__cell:first-child .goods-tile__inner>div, .catalog-grid__cell:first-child .goods-tile__inner>a, .catalog-grid__cell:first-child .goods-tile__inner>span');
    const productCardLableClassNames = await Promise.all(productLableItems.map((card) => card.getAttribute("class")));
    const firstClassNameList = productCardLableClassNames.map((className)=> className?.split(" ")[0]);

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


const insertDataInTheRegistrationForm = async (page:Page,userName:string, userSurname:string,userPhone:string, userPassword:string) => {
    await page.type('#registerUserName', userName);
    await page.type('#registerUserSurname', userSurname);
    await page.type('#registerUserPhone', userPhone);
    await page.type('#registerUserPassword', userPassword);
}
//check the validation of the Email field in the Registration form
test("Email field validation in the Registration form", async ({page}) => {
    await page.goto("https://rozetka.com.ua/ua/");
        
    await page.click('.header-actions__item.header-actions__item--user');
    await page.click('.auth-modal__register-link.button.button--link');
    const registrationFormHeader = await page.innerText('h3.modal__heading');
    expect(registrationFormHeader).toEqual("Реєстрація");

    await insertDataInTheRegistrationForm(page, "Тетяна", "Шевчук", "09859860", "12QAtest"); 

    const invalidEmailDataList = ["12@gmailcom", "@gmail.com", "куа@gmail.com", "12testgmail.com", "   ", " 12@gmailcom"];
    
    for (const data of invalidEmailDataList) {
    await page.fill('#registerUserEmail', ''); 
    await page.type('#registerUserEmail', data);
    await page.click('.button.button--large.button--green.auth-modal__submit');
    const errorMessageText = await page.innerText('.form__row.ng-star-inserted .validation-message.ng-star-inserted');
    expect(errorMessageText).toEqual("Введіть свою ел. пошту")
    }

});