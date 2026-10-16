describe("SauceDemo Testing", () => {
  beforeEach(() => {});
  it("TC01-website open", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="username"]').should("be.visible");

    cy.get('[data-test="password"]').should("be.visible");

    cy.get('[data-test="login-button"]').should("be.visible");
  });

  it("TC02-login-with-correct-username-password", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="username"]').type("standard_user");
    cy.wait(2000);

    cy.get('[data-test="password"]').type("secret_sauce");
    cy.wait(2000);

    cy.get('[data-test="login-button"]').click();
    cy.wait(2000);

    cy.url().should("include", "/inventory.html");
  });

  it("TC03-login-with-incorrect-username-password", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="username"]').type("standard_user-6767");

    cy.get('[data-test="password"]').type("secret_sauce");

    cy.get('[data-test="login-button"]').click();

    cy.contains("Epic sadface").should(
      "contain",
      "Username and password do not match ",
    );

    cy.url().should("include", "/");
  });

  it("TC04-login-with-incorrect-username-and-password", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="username"]').type("standard_user-67");
    cy.wait(2000);

    cy.get('[data-test="password"]').type("open_sauce");
    cy.wait(2000);

    cy.get('[data-test="login-button"]').click();
    cy.wait(2000);

    cy.contains("Epic sadface").should(
      "contain",
      "Username and password do not match ",
    );

    cy.url().should("contain", "/");
  });

  it("TC05-leave-username-blank", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="password"]').type("open_sauce");
    cy.wait(2000);

    cy.get('[data-test="login-button"]').click();
    cy.wait(2000);

    cy.contains("Epic sadface").should("contain", "required");

    cy.url().should("contain", "/");
  });

  it("TC06-leave-password-blank", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="username"]').type("standard_user");
    cy.wait(2000);

    cy.get('[data-test="login-button"]').click();
    cy.wait(2000);

    cy.contains("Epic sadface").should("contain", "required");

    cy.url().should("contain", "/");
  });

  it("TC06-leave-password-and-usrname-blank", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="login-button"]').click();
    cy.wait(2000);

    cy.contains("Epic sadface").should("contain", "required");

    cy.url().should("contain", "/");
  });

  it("TC07-login-and-logout", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="username"]').type("standard_user");
    cy.wait(2000);

    cy.get('[data-test="password"]').type("secret_sauce");
    cy.wait(2000);

    cy.get('[data-test="login-button"]').click();
    cy.wait(2000);

    cy.get("#react-burger-menu-btn").click();
    cy.wait(2000);

    cy.contains("Logout").click();
    cy.wait(2000);

    cy.url().should("include", "/");
  });

  //test case for add item to cart

  it.only("TC07-login-and-logout", () => {
    cy.visit("https://www.saucedemo.com");

    cy.get('[data-test="username"]').type("standard_user");

    cy.get('[data-test="password"]').type("secret_sauce");

    cy.get('[data-test="login-button"]').click();

    cy.url().should("include", "/inventory.html");

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.wait(2000);

    cy.get('[data-test="remove-sauce-labs-bike-light"]').should(
      "contain",
      "Remove",
    );
    cy.get(".shopping_cart_badge").should("have.text", "1");

    cy.wait(2000);

    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    cy.wait(2000);

    cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').should(
      "contain",
      "Remove",
    );
    cy.wait(2000);
    cy.get(".shopping_cart_badge").should("have.text", "2");
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.url().should("include", "/cart.html");

    cy.contains(
      '[data-test="inventory-item-name"]',
      "Sauce Labs Bike Light",
    ).should("be.visible");
    cy.contains(
      '[data-test="inventory-item-name"]',
      "Sauce Labs Fleece Jacket",
    ).should("be.visible");

    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();
    cy.contains(
      '[data-test="inventory-item-name"]',
      "Sauce Labs Bike Light",
    ).should("not.exist");
    cy.wait(2000);

    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");
    cy.wait(2000);

    cy.get('[data-test="firstName"]').type("Afdol");
    cy.get('[data-test="lastName"]').type("Leenud");
    cy.get('[data-test="postalCode"]').type("90560");
    cy.wait(2000);

    cy.get('[data-test="continue"]').click();
    cy.url().should("include", "/checkout-step-two.html");
    cy.wait(2000);

    cy.get('[data-test="inventory-item-name"]').should(
      "have.text",
      "Sauce Labs Fleece Jacket",
    );
    cy.get('[data-test="finish"]').click()
    cy.url().should('include','/checkout-complete.html')

    cy.wait(2000);
    cy.get('[data-test="generate-pdf-order"]').should('be.visible')
    // cy.get('[data-test="generate-pdf-order"]').click()

    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('include', '/inventory.html')
    cy.wait(2000);

  });
});
