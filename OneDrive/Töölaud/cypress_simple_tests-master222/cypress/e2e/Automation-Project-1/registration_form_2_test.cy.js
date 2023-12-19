beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_2.html");
});

/*
Assignement 4: add content to the following tests
*/

describe("Section 1: Functional tests", () => {
  it("User can use only same both first and validation passwords", () => {
    // Add test steps for filling in only mandatory fields
    cy.get("#username").type("ErmALt");
    cy.get("#email").type("123@gmail.com");
    cy.get('[data-cy="name"]').type("Ermo");
    cy.get("#lastName").type("Altmäe");
    cy.get('[data-testid="phoneNumberTestId"]').type("1234");

    // Type confirmation password which is different from first password
    cy.get("#password").type("qwerty");
    cy.get("#confirm").type("qwertyu");
    cy.get("h2").contains("Password").click();

    // Assert that submit button is not enabled
    cy.get(".submit_button").should("be.disabled");

    // Assert that successful message is not visible
    cy.get("#success_message").should("not.visible");

    // Assert that error message is visible
    cy.get("#password_error_message")
      .should("be.visible")
      .should("contain", "Passwords do not match!");
    cy.get(".submit_button").should("be.disabled");

    // Change the test so, that now there are the same values in the password and confirmation password input fields.
    cy.get("#confirm").clear();
    cy.get("#confirm").type("qwerty");
    cy.get("h2").contains("Password").click();

    // Assert that the error message is not visible anymore and the submit button is enabled (click on some other element before the assertion).
    cy.get("#password_error_message").should("not.be.visible");
    cy.get(".submit_button").should("be.enabled");
  });

  it("User can submit form with all fields added", () => {
    // Add test steps for filling in ALL fields
    cy.get("#username").type("ErmALt");
    cy.get("#email").type("123@gmail.com");
    cy.get('[data-cy="name"]').type("Ermo");
    cy.get("#lastName").type("Altmäe");
    cy.get('[data-testid="phoneNumberTestId"]').type("1234");
    cy.get("#cssFavLanguage").click();
    cy.get("#vehicle1").click();
    cy.get("#cars").children().should("have.length", 4);
    cy.get("#cars option").last().should("have.text", "Audi");
    cy.get("#animal option").last().should("have.text", "Horse");
    cy.get("#password").type("qwerty");
    cy.get("#confirm").type("qwerty");
    cy.get("h2").contains("Password").click();
    cy.get("h2").contains("Password").click();

    // Assert that submit button is enabled
    cy.get(".submit_button").should("be.enabled");

    // Assert that after submitting the form system show successful message
    cy.get("#success_message").should(
      "contain",
      "User successfully submitted registration"
    );
  });

  it("User can submit form with valid data and only mandatory fields added", () => {
    // Add test steps for filling in ONLY mandatory fields
    cy.get("#username").type("ErmALt");
    cy.get("#email").type("123@gmail.com");
    cy.get('[data-cy="name"]').type("Ermo");
    cy.get("#lastName").type("Altmäe");
    cy.get("#password").type("qwerty");
    cy.get("#confirm").type("qwerty");
    cy.get("#password_error_message").should("not.be.visible");
    cy.get("h2").contains("Password").click();

    // Assert that submit button is enabled
    cy.get(".submit_button").should("be.disabled");

    // Assert that after submitting the form system shows successful message
    cy.get("#success_message").should(
      "contain",
      "User successfully submitted registration"
    );

    // example, how to use function
  });

  // Add at least 1 test for checking some mandatory field's absence
});

/*
Assignement 5: create more visual tests
*/

describe("Section 2: Visual tests", () => {
  it("Check that logo is correct and has correct size", () => {
    cy.log("Will check logo source and size");

    // Find the image element and get its src attribute
    cy.get("img")
      .should("be.visible")
      .should("have.attr", "src")
      .then((src) => {
        cy.log(`Logo source: ${src}`);
        expect(src).to.include("cerebrum_hub_logo");
      });

    cy.get('[data-cy="cypress_logo"]')
      .should("be.visible")
      .invoke("height")
      .should("be.oneOf", [88, 116]);
    it("Assert height to be above 178", () => {
      // Assuming the element you want to check is an image
    });
  });

  it("My test for second picture", () => {
    // Create similar test for checking the second picture
    cy.log("Will check logo source and size");
    cy.get('[data-cy="cypress_logo"]')
      .should("have.attr", "src")
      .should("include", "cypress_logo");
    // get element and check its parameter height, to less than 178 and greater than 100
    cy.get('[data-cy="cypress_logo"]')
      .invoke("height")
      .should("be.lessThan", 100)
      .and("be.greaterThan", 80);
  });

  it("Check navigation part", () => {
    cy.get("nav").children().should("have.length", 2);

    // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
    cy.get("nav")
      .siblings("h1")
      .should("have.text", "Registration form number 2");

    // Get navigation element, find its first child, check the link content and click it
    cy.get("nav")
      .children()
      .eq(0)
      .should("be.visible")
      .and("have.attr", "href", "registration_form_1.html")
      .click();

    // Check that currently opened URL is correct
    cy.url().should("contain", "/registration_form_1.html");

    // Go back to previous page
    cy.go("back");
    cy.log("Back again in registration form 2");
  });

  // Create similar test for checking the second link

  it("Check that radio button list is correct", () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get('input[type="radio"]').should("have.length", 4);

    // Verify labels of the radio buttons
    cy.get('input[type="radio"]').next().eq(0).should("have.text", "HTML");
    cy.get('input[type="radio"]').next().eq(1).should("have.text", "CSS");
    cy.get('input[type="radio"]')
      .next()
      .eq(2)
      .should("have.text", "JavaScript");
    cy.get('input[type="radio"]').next().eq(3).should("have.text", "PHP");

    //Verify default state of radio buttons
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
    cy.get('input[type="radio"]').eq(1).should("not.be.checked");
    cy.get('input[type="radio"]').eq(2).should("not.be.checked");
    cy.get('input[type="radio"]').eq(3).should("not.be.checked");

    // Selecting one will remove selection from other radio button
    cy.get('input[type="radio"]').eq(0).check().should("be.checked");
    cy.get('input[type="radio"]').eq(1).check().should("be.checked");
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
  });

  // Create test similar to previous one verifying check boxes

  it("Car dropdown is correct", () => {
    // Here is an example how to explicitely create screenshot from the code
    // Select second element and create screenshot for this area, and full page
    cy.get("#cars").select(1).screenshot("Cars drop-down");
    cy.screenshot("Full page screenshot");

    // Here are given different solutions how to get the length of array of elements in Cars dropdown
    // Next 2 lines of code do exactly the same!
    cy.get("#cars").children().should("have.length", 4);
    cy.get("#cars").find("option").should("have.length", 4);

    //Check  that first element in the dropdown has text Volvo
    cy.get("#cars").find("option").eq(0).should("have.text", "Volvo");

    // Advanced level how to check the content of the Cars dropdown
    cy.get("#cars")
      .find("option")
      .then((options) => {
        const actual = [...options].map((option) => option.value);
        expect(actual).to.deep.eq(["volvo", "saab", "opel", "audi"]);
      });
  });

  // Create test similar to previous one
});

function inputValidData(username) {
  cy.log("Username will be filled");
  cy.get('input[data-testid="user"]').type(username);
  cy.get("#email").type("ermo.altmae.002@gmail.com");
  cy.get('[data-cy="name"]').type("Ermo");
  cy.get("#lastName").type("Altmäe");
  cy.get('[data-testid="phoneNumberTestId"]').type("56568141");
  cy.get("#password").type("Qwerty");
  cy.get("#confirm").type("Qwerty2");
  cy.get("h2").contains("Password").click();
}
