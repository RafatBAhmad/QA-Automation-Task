/// <reference types="cypress" />

import { search_positive } from "../support/hotels_helper"
import { search_negative } from "../support/hotels_helper"

const POS_SEARCH_LOCATION = 'Jerusalem';
const NEG_SEARCH_LOCATION = '$12!3_Jerusalem';

describe("Verify that search filters works well", () => {
    beforeEach(() => {
        cy.visit("https://www.hotels.com/", {
            headers: {
                "Accept-Encoding": "gzip, deflate"    
            }
        })        
    })
    it("Test correct format address location in the search location field", () => {
        search_positive(POS_SEARCH_LOCATION)
    })

    it("Test wrong format address location in the search location field", () => {
        search_negative(NEG_SEARCH_LOCATION)
    })

})