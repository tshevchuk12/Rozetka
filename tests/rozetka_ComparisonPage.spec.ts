import {test, expect, Page} from '@playwright/test'


test("comparisonPageShowDifferencesButton", async ({page}) => {
    await page.goto("https://rozetka.com.ua/ua/notebooks/c80004/");
    //const productElements = await page.$$('.catalog-grid .catalog-grid__cell')
    const [firstProductElement, secondProductElement] = await page.$$('.catalog-grid .catalog-grid__cell');
    const firstProductComparisonButton = await firstProductElement.$('rz-app-compare-button.ng-star-inserted');
    await firstProductComparisonButton?.click();

    const secondProductComparisonButton = await secondProductElement.$('rz-app-compare-button.ng-star-inserted');
    await secondProductComparisonButton?.click();
    
    await page.click('[href="#icon-header-compare"]');
    const comparisonFormHeader = await page.innerText('.modal__header .modal__heading');
    expect(comparisonFormHeader).toEqual("Список порівнянь");

    await page.click('li .comparison-modal__link');
    
    await page.waitForSelector('.comparison__sticky h1.comparison__heading');
    
    const comparisonPageTitle = await page.innerText('.comparison__sticky h1.comparison__heading');
    expect(comparisonPageTitle).toEqual("Порівнюємо ноутбуки");

})