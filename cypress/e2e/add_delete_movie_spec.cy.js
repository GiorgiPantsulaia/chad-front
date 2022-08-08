before(() => {
  cy.login();
});
describe("user can add and delete a movie", () => {
  it("visits the movies list url and adds movie", () => {
    cy.viewport(1920, 1080);

    cy.visit("/movies");

    cy.contains("Add movie").click();

    cy.get('input[name="english_title"]').type("test movie");

    cy.get('input[name="georgian_title"]').type("სატესტო ფილმი");

    cy.get('input[name="income"]').type("2222222");

    cy.get('input[name="release_date"]').type("2000");

    cy.get("select").select(0);

    cy.get('input[name="director_eng"]').type("ermalo");

    cy.get('input[name="director_geo"]').type("ერმალო");

    cy.get('textarea[name="english_description"]').type("some description");

    cy.get('textarea[name="georgian_description"]').type("ფილმის აღწერა");

    cy.get('input[name="img_upload"').attachFile("test.jpg");
    cy.contains("test.jpg");
    cy.contains("Post").click();
    cy.contains("test movie").click();
    cy.contains("2000");
    cy.contains("2222222");
    cy.contains("ermalo");
    cy.contains("some description");
    cy.get('button[name="delete"').click();
    cy.contains("Yes").click();
    cy.should("not.contain", "test movie");
  });
});
