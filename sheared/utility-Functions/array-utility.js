/// <reference types="Cypress" />
const findStudioLocators = require('../find-studio.locators');
require('cypress-xpath');


let getArraysDifference = (firstArray, secondArray) => {
    let finalArray = [];
    for (let i = 0; i < firstArray.length; i++) {
        if (secondArray.indexOf(firstArray[i]) === -1) {
            finalArray.push(firstArray[i]);
        }
    }
    for (let i = 0; i < secondArray.length; i++) {
        if (firstArray.indexOf(secondArray[i]) === -1) {
            finalArray.push(secondArray[i]);
        }
    }
    return finalArray;
};

let getFirstStudioDays = () => {
    const studioScheduleDays = [];
    cy.xpath(findStudioLocators.LocationDivs, { timeout: 2000 }).eq(0).children().each((element) => {
        if (element.text().length != 0) {
            studioScheduleDays.push(element.text());
        }
    });
    cy.log(`test >>> ${studioScheduleDays}`);
    return studioScheduleDays;
};

let filterByOtherDays = (studioDays) => {
    const filterDays = cy.get(findStudioLocators.daysFilterButtons, { timeout: 2000 });
    filterDays.each(dayFilter => {
        let dayFilterText = dayFilter.text();
        if (studioDays.includes(dayFilterText.toUpperCase())) {
            dayFilter.click();
        }
    });
};



let WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

module.exports = { getArraysDifference, getFirstStudioDays, WEEK_DAYS, filterByOtherDays };