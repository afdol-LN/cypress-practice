describe("shopping automate test ", () => {
  const COOKIE = "session-username";

  const login = () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.wait(2000);

    cy.get('[data-test="password"]').type("secret_sauce");
    cy.wait(2000);

    cy.get('[data-test="login-button"]').click();
    cy.wait(2000);

    cy.url().should("include", "/inventory.html");
  };
  const my_information = () => {
    cy.get('[data-test="firstName"]').type("Afdol");
    cy.get('[data-test="lastName"]').type("Leenud");
    cy.get('[data-test="postalCode"]').type("90560");
    cy.wait(2000);
  };

  const checkItem = (item) => {
    cy.contains(
      '[data-test="inventory-item-name"]',
      `Sauce Labs ${item}`,
    ).should("be.visible");
  };
  const checkItemNotExist = (item) => {
    cy.contains(
      '[data-test="inventory-item-name"]',
      `Sauce Labs ${item}`,
    ).should("not.exist");
  };

  const removeItem = (item) => {
    cy.get(`[data-test="remove-sauce-labs-${item}"]`).click();
  };

  it("TC01 add to cart and log out while purchase", () => {
    cy.visit("https://www.saucedemo.com");

    login();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");

    cy.wait(2000);

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");

    cy.wait(2000);

    cy.get("#react-burger-menu-btn").click();
    cy.get('[data-test="logout-sidebar-link"]').click();

    cy.url().should("include", "/");

    cy.get('[data-test="username"]').type("standard_user");
    cy.wait(2000);

    cy.get('[data-test="password"]').type("secret_sauce");
    cy.wait(2000);

    cy.get('[data-test="login-button"]').click();
    cy.wait(2000);

    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");
  });

  it("TC 2 check cookie storage ", () => {
    cy.visit("https://www.saucedemo.com");
    login();
    cy.getCookie(COOKIE).should("exist");

    cy.clearCookie(COOKIE);

    cy.reload();
    cy.url().should("include", "/");
    cy.get('[data-test="error"]').should("contain", "Epic sadface");
  });

  it.only("TC 3 back from checkout overview and remove item", () => {
    cy.visit("https://www.saucedemo.com");
    login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");

    cy.wait(2000);

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");

    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="checkout"]').click();

    my_information();

    cy.get('[data-test="continue"]').click();

    checkItem("Backpack");

    checkItem("Bike Light");

    cy.go("back");
    cy.wait(200);
    cy.go("back");
    cy.wait(200);

    removeItem("bike-light");
    cy.wait(1000);

    cy.go("forward");
    cy.wait(200);
    cy.go("forward");
    cy.wait(200);

    checkItemNotExist("Bike Light");
  });
});
