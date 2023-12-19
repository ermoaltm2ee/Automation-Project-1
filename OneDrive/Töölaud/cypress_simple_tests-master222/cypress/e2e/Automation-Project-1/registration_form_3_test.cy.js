beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_3.html");
});

/*
    BONUS TASK: add visual tests for registration form 3
    Task list:
    * Test suite for visual tests for registration form 3 is already created
    * Create tests to verify visual parts of the page:
        * radio buttons and its content
        * dropdown and dependencies between 2 dropdowns
        * checkboxes, their content and links
        * email format
     */

it("Frequency of receiving newsletter", () => {
  cy.get('input[name="freq"]').next().eq(0).should("have.text", "Daily");
  cy.get('input[name="freq"]').next().eq(1).should("have.text", "Weekly");
  cy.get('input[name="freq"]').next().eq(2).should("have.text", "Monthly");
  cy.get('input[name="freq"]').next().eq(3).should("have.text", "Never");
});

it("default state of radio buttons", () => {
  cy.get('input[name="freq"]').eq(0).should("not.be.checked");
  cy.get('input[name="freq"]').eq(1).should("not.be.checked");
  cy.get('input[name="freq"]').eq(2).should("not.be.checked");
  cy.get('input[name="freq"]').eq(3).should("not.be.checked");
});

it("Test if dropdown have 4 options", () => {
  cy.get("#country").children("option").should("have.length", 4);
  cy.get("#country").find("option").should("have.length", 4);
  cy.get("#country").select(2).screenshot("Country drop-down");
  cy.get("#country").find("option").eq(2).should("have.text", "Estonia");
});

it("Test the Country dropdown works correctly", () => {
  cy.get("#country").select("Estonia");
});

it("Test the City dropdown works correctly", () => {
  cy.get("#country").select("Austria");
  cy.get("#city").select("Innsbruck");
});

//Error: Timed out retrying after 4000ms: cy.select() failed because it could not find a single <option> with value, index, or text matching: Tallinn
it.skip("Validate error handling when invalid City are made in the dropdowns.", () => {
  cy.get("#country").select("Austria");
  cy.get("#city").select("Tallinn");
});

it("Confirm the selection and deselection of individual checkboxes.", () => {
  cy.get("#country").select("Austria");
  cy.get("#country").should("not.be.checked");
});

it("Validate the acceptance of a valid email address in the designated field", () => {
  cy.get(".email").type("ermo@gmail.com");
});

//Test different formats of email addresses (e.g., with/without @ symbol, valid domain extensions, special characters).
it("Invalid email", () => {
  cy.get(".email").type("ermo.gmail.com");
  const email = "test@example.com";
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="email"]').clear();
});

it("Verify error messages and handling for incorrect or malformed email formats.", () => {
  cy.get(".email").type("ermomail.com");
  cy.get('span:contains("Invalid email address.")').should("be.visible");
  cy.get('input[type="email"]').clear();
  cy.get(".email").type("ermo.gmail.com");
});

it("Email with unknown domain", () => {
  cy.get(".email").type("ermo@somerandomdomain");
});

it("Set date of birth", () => {
  const dateToSet = "1992-08-27";
  cy.get('input[type="date"]').eq(0).clear().type(dateToSet);
  cy.get('input[type="date"]').should("have.value", dateToSet);
  cy.get('input[type="date"][name="birthday"]').type(dateToSet);
});
/*
    BONUS TASK: add functional tests for registration form 3
    Task list:
    * Create second test suite for functional tests
    * Create tests to verify logic of the page:
        * all fields are filled in + validation
        * only mandatory fields are filled in + validations
        * mandatory fields are absent + validations (try using function)
        * If city is already chosen and country is updated, then city choice should be removed
        * add file (google yourself for solution)
     */

it("Select the frequency of receiving our newsletter", () => {
  cy.get('input[type="radio"]').should("have.length", 4);
  cy.get('input[name="freq"]').next().eq(0).should("have.text", "Daily");
  cy.get('input[name="freq"]').next().eq(1).should("have.text", "Weekly");
  cy.get('input[name="freq"]').next().eq(2).should("have.text", "Monthly");
  cy.get('input[name="freq"]').next().eq(3).should("have.text", "Never");
});

it("Selecting one will remove selection from other radio button", () => {
  cy.get('input[name="freq"]').eq(0).check().should("be.checked");
  cy.get('input[name="freq"]').eq(1).check().should("be.checked");
  cy.get('input[name="freq"]').eq(0).should("not.be.checked");
});

it("Fill in all fields with valid data", () => {
  cy.get("#name").type("Ermo");
  cy.get(".email").type("ermo.altmae@mail.com");
  cy.get("#country").select("Estonia");
  cy.get("#city").select("Tallinn");
  const dateToSet = "1992-08-27";
  cy.get('input[type="date"]').eq(0).clear().type(dateToSet);
  cy.get('input[type="date"]').should("have.value", dateToSet);
  cy.get('input[type="date"][name="birthday"]').type(dateToSet);
  cy.get('input[type="radio"]').should("have.length", 4);
  cy.get('input[name="freq"]').next().eq(0).should("have.text", "Daily");
  cy.get('input[name="freq"]').next().eq(1).should("have.text", "Weekly");
  cy.get('input[name="freq"]')
    .next()
    .eq(2)
    .should("have.text", "Monthly")
    .click();
  cy.get('input[name="freq"]').next().eq(3).should("have.text", "Never");
});

it("Verify all fields are filled in + validation", () => {
  cy.get(".email").type("ermo@gmail.com");
});

it("Fill in only mandatory fields with valid data", () => {
  cy.get("#name").type("Ermo");
  cy.get(".email").type("ermo.altmae@mail.com");
  const dateToSet = "1992-08-27";
  cy.get('input[type="date"]').eq(0).clear().type(dateToSet);
  cy.get('input[type="date"]').should("have.value", dateToSet);
  cy.get('input[type="date"][name="birthday"]').type(dateToSet);
  cy.get("#country").select("Estonia");
  cy.get("#city").select("Tallinn");
  cy.get('input[type="checkbox"][required][ng-model="checkbox"]').check();
});

it("Assert validation messages for any missing mandatory fields", () => {
  //Name: cy.type() cannot accept an empty string. You need to actually type something.
  cy.get("#name").type("s");
  //Email: Email is required.
  cy.get(".email").type("ermoaltmae@gmail.com").clear();
  //Date of birth / Birthday
  const dateToSet = "1992-08-27";
  cy.get('input[type="date"]').eq(0).clear().type(dateToSet);
  cy.get('input[type="date"]').should("have.value", dateToSet);
  cy.get('input[type="date"][name="birthday"]').type(dateToSet).clear();
});

it("Use a function to clear mandatory fields or not fill them", () => {
  cy.get("#name").type("Ermo");
  cy.get("#name").type("Ermo2").clear();
  cy.get(".email").type("ermo.alssssssstmae@mail.com");
  cy.get(".email").type("ermo.altmae@mail.com").clear();
  const dateToSet = "1992-08-27";
  cy.get('input[type="date"]').eq(0).clear().type(dateToSet);
  cy.get('input[type="date"]').eq(0).clear().type(dateToSet).clear();
});

it("Add file", () => {
  cy.get("input[type=file]").selectFile("cypress/fixtures/cypress_logo.png");
});
