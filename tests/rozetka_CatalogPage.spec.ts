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