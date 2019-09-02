/// <reference types="Cypress" />
const findStudioLocators = require('../../sheared/find-studio.locators');
const utilityFunctions = require('../../sheared/utility-Functions/array-utility');

describe('Test find studio at weight watchers website', () => {

    const zipCode = '10003';
    before(() => {
        cy.visit('find-a-meeting');
    });

    it('Should verify that url contains the zip code from search field', () => {
        cy.get(findStudioLocators.meetingSearchInputField).type(zipCode);
        cy.get(findStudioLocators.meetingSearchButton).click();
        cy.url().should('contain', zipCode);
    });

    it(`Should verify that first location displayed contains the zip code from search field`, () => {
        cy.get(findStudioLocators.locations).eq(0).should('contain', zipCode);
    });

    it(`Should verify that the location appears when filtering by days in the location schedule`, () => {
        cy.get(findStudioLocators.meetingLocationDivs, { timeout: 2000 }).eq(0).invoke('attr', 'id').then(firstLocationId => {

            const studioDays = utilityFunctions.getFirstStudioDays();
            // cy.log(`text >>> ${studioDays}`);
            // const studioDays = ['Tue'];
            utilityFunctions.filterByOtherDays(studioDays);
            cy.get(findStudioLocators.meetingLocationDivs, { timeout: 2000 }).eq(0).invoke('attr', 'id').then(firstLocationIdAfterClicking => { // must has ID
                expect(firstLocationId == firstLocationIdAfterClicking).to.equal(true);
            });
        });
    });

    xit(`Should verify that the first location disappears when filtering by days out of the location schedule`, () => {
        cy.reload();
        cy.get(findStudioLocators.meetingLocationDivs, { timeout: 2000 }).eq(0).invoke('attr', 'id').then(firstLocationId => {
            const studioDays = ['Fri'];
            // const studioDays = utilityFunctions.getFirstStudioDays();


            // utilityFunctions.filterByOtherDays(otherDays);
            utilityFunctions.filterByOtherDays(studioDays);
            cy.get(findStudioLocators.meetingLocationDivs, { timeout: 2000 }).eq(0).should('have.attr', 'id').then(firstLocationIdAfterClicking => { // must has ID
                expect(firstLocationId != firstLocationIdAfterClicking).to.equal(true);
            });
        });
    });
});