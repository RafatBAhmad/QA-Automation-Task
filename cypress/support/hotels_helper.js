const SELECTORS = {
    searchField: "[type = 'text']",
    searchButton: "[class ='_3pFoIe eLsxCc']",
    locationInfo: "._2lmU8j",
    hotelsSearchResult: '._61P-R0',
    dataLocationInfo: 'span'
}
/**
 * These methods type in searchField and then search for the result after that
 * open the first result and check if the location of this result is in the same
 * searched location.The negative means that the searchVal is in wrong format.
 * @param {String} searchVal 
 * 
 */
export const search_negative = (searchVal) => {
    const type_enter = searchVal + '{enter}'
    cy.get(SELECTORS.searchField).type(type_enter)
    let new_location_name
    let final_location
    cy.get(SELECTORS.searchField).then($el => {
        new_location_name = $el.text()
        final_location = new_location_name.split(",")
        cy.wait(10000)
        click_search(final_location[0])
    })
    //cy.wait(10000)
    // click_search(f_l)
    

}


export const search_positive = (searchVal) => {
    cy.get(SELECTORS.searchField).type(searchVal)
    cy.contains(searchVal).click()
    click_search(searchVal)
}

/**
 * search and chose hotel and check if the chosen one is in the same search loaction.
 * @param {String} searchVal
 *
 */
export const click_search = (searchVal) => {
    cy.intercept({
        method: "GET",
        url: "https://securepubads.g.doubleclick.net/gampad/*"
    }).as('searchForTerms')
    cy.get(SELECTORS.searchButton).click()
    cy.wait('@searchForTerms', { timeout: 30000 })
    cy.get(SELECTORS.hotelsSearchResult).eq(0).invoke('removeAttr', 'target').click()
    cy.get(SELECTORS.locationInfo).within(() => {
        cy.get(SELECTORS.dataLocationInfo).invoke('text').then((ActualTextLocation) => {
            if (!ActualTextLocation.includes(searchVal)) {
                expect(ActualTextLocation).to.include(searchVal)
            }
        })
    })
}