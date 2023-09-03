import { ElementHandle,expect, Page } from "@playwright/test"
import {searchPageSelectors} from "../Selectors/searchPageSelectors"
import {createUtilities} from '../Utilities/Utility'

const createSearchPage = (page:Page) => {
    const utility = createUtilities(page)
    const searchPage ={
        setSearchData: async(data:string) => {
            await utility.clearAndType(searchPageSelectors.SEARCH_FIELD,data)
        },
        getSearchPageHeader: () => page.textContent(searchPageSelectors.SEARCHPAGE_HEADER)
        
    }
    return searchPage
}

export {createSearchPage}