// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Find any quote in millions of movie lines");
  });
});
