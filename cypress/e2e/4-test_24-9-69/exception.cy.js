const foodData = require('../../fixtures/food.json')

describe("automate test exception", () => {
  const webUrl = "https://practicetestautomation.com/practice-test-exceptions/";

  beforeEach(() => {
    cy.visit(webUrl);
  });

  const addButton = () => {
    cy.get('[id="add_btn"]').click();
  };

  const editFood = (newFood) => {
    cy.get('[id="edit_btn"]').click();
    cy.get('[class="input-field"]').type(newFood);
  };

  const rowVisible = (row) =>{
    cy.get(`#${row}`).should("be.visible");
  }

  const saveButton = (row) =>[
    cy.get(`#${row} > [name="Save"]`)
  ]

  it("TC01 no element exception", () => {
    addButton();
    cy.wait(5000);
    cy.get("#row2").should("be.visible");
  });

  it("TC02 add row 2 ", ()=>{
    addButton();
    cy.wait(5000);
    cy.food('row2', foodData.food.item2);
    rowVisible('row2');
    
  })
});
