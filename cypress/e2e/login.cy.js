describe("user can log in ", () => {
  it("user enters invalid values in inputs", () => {
    cy.viewport(1920, 1080);

    cy.visit("/login");
    cy.contains("Sign in").click();
    cy.contains("This field is required");
  });
  it("user logs in with correct credentials", () => {
    cy.viewport(1920, 1080);
    cy.get('input[name="user"').type("test@test.com");
    cy.get('input[name="password"').type("validpass123");
    cy.contains("Sign in").click();
    cy.clock(
      setTimeout(() => {
        cy.should("contain", "Log out");
        cy.should("contain.text", "test123");
      }, 2000)
    );
  });
});
