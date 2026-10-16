const testDataLogin = require('../../fixtures/login1.json');
import loginPage from '../../support/page_object/loginPage'

describe("practice automate test ", () => {
  beforeEach(() => {
    cy.visit("https://practicetestautomation.com/practice-test-login/");
  });

  const checkUrl = (path) => {
    cy.url().should("include", path);
  };

  it("TC01 test valid username and password", () => {
    cy.login1(testDataLogin.username.correct, testDataLogin.password.correct);
    loginPage.verifyLoginSuccessText();
  });

  it("TC02 invalid username ", () => {
    cy.login1(testDataLogin.username.incorrect, testDataLogin.password.correct);
    checkUrl("/practice-test-login");
    loginPage.verifyLoginErrorText('username')
  });

  it("TC03 invalid password ", () => {
    cy.login1(testDataLogin.username.correct, testDataLogin.password.incorrect)
    checkUrl("/practice-test-login");
    loginPage.verifyLoginErrorText('password')
  });
});
