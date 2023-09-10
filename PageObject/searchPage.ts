import { ElementHandle,expect, Page } from "@playwright/test"
import {searchPageSelectors} from "../Selectors/searchPageSelectors"
import {utility} from '../Utilities/Utility'

const createSearchPage = (page:Page) => {
    const searchPage ={
        setSearchData: async(data:string) => {
            await utility.clearAndType(page,searchPageSelectors.SEARCH_FIELD,data)
        },
        getSearchPageHeader: () => page.textContent(searchPageSelectors.SEARCHPAGE_HEADER)
        
    }
    return searchPage
}

export {createSearchPage}