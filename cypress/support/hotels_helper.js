const SELECTORS = {
    searchField: "[type = 'text']",
    searchButton: "[class ='_3pFoIe eLsxCc']",
    locationInfo: "._2lmU8j",
    hotelsSearchResult: '._61P-R0',
    dataLocationInfo: 'span'
}
/**
 * This method type in searchField and then search for the result after that
 * open the first result and check if the location of this result is in the same
 * searched location.
 * @param {String} searchVal 
 * 
 */
export const search = (searchVal) => {
    cy.intercept({
        method: "GET",
        url: "https://securepubads.g.doubleclick.net/gampad/*"
    }).as('searchForTerms')
    cy.get(SELECTORS.searchField).type(searchVal)
    cy.contains(searchVal).click()
    cy.get(SELECTORS.searchButton).click()
    cy.wait('@searchForTerms', { timeout: 30000 })
    // cy.get("#0").click()

    cy.get(SELECTORS.hotelsSearchResult).eq(0).invoke('removeAttr', 'target').click()
    // cy.pause()
    //cy.contains("span", searchVal)
    cy.get(SELECTORS.locationInfo).within(() => {
        cy.get(SELECTORS.dataLocationInfo).invoke('text').then((ActualTextLocation)=>{
            if (!ActualTextLocation.includes(searchVal)){
                expect(ActualTextLocation).to.include(searchVal)

            }

        })
    })
    
}
