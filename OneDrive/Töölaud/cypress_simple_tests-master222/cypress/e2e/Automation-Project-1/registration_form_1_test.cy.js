// Before each test (it...) load .html page
beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_1.html");
});

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
 2. Replace text ‘Password123’ in the first test with your own chosen password (2 places) - passwords should match
 3. Change phone number in the first test to 555666777
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 5. Add comment to the first test containing today’s date
 */

describe("Ermo_Altmae_first test suite", () => {
  it("User can submit data only when valid mandatory values are added", () => {
    cy.get('[data-testid="phoneNumberTestId"]').type("555666777");
    cy.get('input[name="password"]').type("Metsavennad2k23");
    cy.get('[name="confirm"]').type("Metsavennad2k23");
    cy.get("#username").type("ErmoAlt");

    //in order to activate submit button, user has to click somewhere outside the input field
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.enabled");
    cy.get(".submit_button").click();

    // Assert that both input and password error messages are not shown
    // next 2 lines check exactly the same, but using different approach
    cy.get("#input_error_message").should("not.be.visible");
    cy.get("#password_error_message").should("have.css", "display", "none");

    // Assert that success message is visible
    // next 2 lines check exactly the same, but using different approach
    cy.get("#success_message").should("be.visible");
    cy.get("#success_message").should("have.css", "display", "block");
  });

  it("User can submit data only when valid mandatory values are added", () => {
    //Test_14.Nov.2023
    cy.get('[data-testid="phoneNumberTestId"]').type("555666777");
    cy.get('[data-testid="phoneNumberTestId"]').type("551266377");
    cy.get('input[name="password"]').type("Metsavennad2k23");
    cy.get('[name="confirm"]').type("Metsavennad2k23");
    cy.get("#username").type("ErmoA");
    cy.get("#firstName").type("Ermo");
    cy.get("#lastName").type("Altmäe");

    //in order to activate submit button, user has to click somewhere outside the input field
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.enabled");
    cy.get(".submit_button").click();

    // Assert that both input and password error messages are not shown
    // next 2 lines check exactly the same, but using different approach
    cy.get("#input_error_message").should("not.be.visible");
    cy.get("#password_error_message").should("have.css", "display", "none");

    // Assert that success message is visible
    // next 2 lines check exactly the same, but using different approach
    cy.get("#success_message").should("be.visible");
    cy.get("#success_message").should("have.css", "display", "block");
  });

  it("User cannot submit data when username is absent", () => {
    cy.get("#username").type("ErmoA");
    cy.get('[data-testid="phoneNumberTestId"]').clear();
    cy.get('input[name="password"]').type("Metsavennad2k23");
    cy.get('[name="confirm"]').type("Metsavennad2k23");

    // Scroll back to username input field
    cy.get("#username").scrollIntoView();
    cy.get("#username").clear();
    cy.get("h2").contains("Password").click();

    // Asserting that Submit button is disabled
    cy.get(".submit_button").should("be.disabled");

    // Assert that success message is not visible
    cy.get("#success_message").should("not.be.visible");

    // Assert that correct error message is visible and contain given text
    cy.get("#input_error_message")
      .should("be.visible")
      .should("contain", "Mandatory input field is not valid or empty!");

    // Assert that username has tooltip with error message
    cy.get('input[name="username"]')
      .should("have.attr", "title")
      .should("contain", "Input field");

    // There are 2 options how to check error message visibility: using CSS or simply be.visible
    // none = not visible; block = visible
    cy.get("#input_error_message").should("be.visible");
    cy.get("#input_error_message").should("have.css", "display", "block");
  });

  describe("User cannot submit data when username is absent", () => {
    it("User can submit data only when valid mandatory values are added", () => {
      //Test_14.Nov.2023
      cy.get('[data-testid="phoneNumberTestId"]').type("555666777");
      cy.get('[data-testid="phoneNumberTestId"]').type("551266377");
      cy.get('input[name="password"]').type("Metsavennad2k23");
      cy.get('[name="confirm"]').type("Metsavennad2k23");
      cy.get("#username").type(" ");
      cy.get("#firstName").type("Ermo");
      cy.get("#lastName").type("Altmäe");

      //in order to activate submit button, user has to click somewhere outside the input field
      cy.get("h2").contains("Password").click();

      // Assert that both input and password error messages are not shown
      // next 2 lines check exactly the same, but using different approach
      cy.get("#input_error_message").should("not.be.visible");
      cy.get("#password_error_message").should("have.css", "display", "none");

      // Assert that success message is visible
      // next 2 lines check exactly the same, but using different approach
    });
  });
  describe("User cannot submit data when password and/or confirmation password is absent", () => {
    it("User can submit data only when valid mandatory values are added", () => {
      cy.get('[data-testid="phoneNumberTestId"]').type("555666777");

      cy.get("#username").type("Something");

      //in order to activate submit button, user has to click somewhere outside the input field
      cy.get("h2").contains("Password").click();

      // Assert that both input and password error messages are not shown
      // next 2 lines check exactly the same, but using different approach
      cy.get("#input_error_message").should("not.be.visible");
      cy.get("#password_error_message").should("have.css", "display", "none");

      // Assert that success message is visible
      // next 2 lines check exactly the same, but using different approach
    });
  });

  describe("User cannot add letters to phone number", () => {
    it("User can submit data only when valid mandatory values are added", () => {
      cy.get('[data-testid="phoneNumberTestId"]').type("phonenr");
      cy.get('input[name="password"]').type("Metsavennad2k23");
      cy.get('[name="confirm"]').type("Metsavennad2k23");
      cy.get("#username").type("ErmoA");
      cy.get("#firstName").type("Ermo");
      cy.get("#lastName").type("Altmäe");

      //in order to activate submit button, user has to click somewhere outside the input field
      cy.get("h2").contains("Password").click();

      // Assert that both input and password error messages are not shown
      // next 2 lines check exactly the same, but using different approach
      cy.get("#input_error_message").should("not.be.visible");
      cy.get("#password_error_message").should("have.css", "display", "none");

      // Assert that success message is visible
      // next 2 lines check exactly the same, but using different approach
    });
  });
});
