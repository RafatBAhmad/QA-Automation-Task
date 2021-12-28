const SELECTORS = {
    searchField: "[type = 'text']",
    searchButton: "[class ='_3pFoIe eLsxCc']"
}
/**
 * Method DOM
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

    cy.get('._61P-R0').eq(0).invoke('removeAttr', 'target').click()
    // cy.pause()
    //cy.contains("span", searchVal)
    cy.get("._2lmU8j").within(() => {
        cy.get('span').invoke('text').then((ActualTextLocation)=>{
            if (!ActualTextLocation.includes(searchVal)){
                expect(ActualTextLocation).to.include(searchVal)

            }

        })
    })
    
}
