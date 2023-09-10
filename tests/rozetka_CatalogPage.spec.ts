import {test, expect, Page } from "@playwright/test";
import { createCatalogPage } from "../PageObject/catalogPage";

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

//Check "show more" button on the Catalog page
test("Show more button increases the quantity of goods on the Catalog page", async({page})=>{
    const catalogPage = createCatalogPage(page);
    await catalogPage.openCatalogPage();

    const productsBefore = await catalogPage.getProductItemsList();
    
    // while((await catalogPage.getProductItems()).length < 200){
    //     await page.waitForTimeout(3000)
    //     await catalogPage.clickShowMoreButton()
    // }

    //Variant with recursion
    await catalogPage.getExpectedGoodsQuantity(200)

    const productsAfter = await catalogPage.getProductItemsList();
    
    expect(productsAfter.length).toBeGreaterThan(productsBefore.length)
    console.log(productsAfter.length)

})