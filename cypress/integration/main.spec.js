/// <reference types="cypress" />

import { search } from "../support/hotels_helper"

const POS_SEARCH_LOCATION = "Jerusalem";
const NEG_SEARCH_LOCATION = "$1454_Nablus";

describe("Verify that search filters works well", () => {
    beforeEach(() => {
        cy.visit("https://www.hotels.com/", {
            headers: {
                "Accept-Encoding": "gzip, deflate"
            }
        })
        
    })
    it("Positive Test Case", () => {
        search(POS_SEARCH_LOCATION)
    })

    it("Negative Test Case", () => {
        search(NEG_SEARCH_LOCATION)
    })

})