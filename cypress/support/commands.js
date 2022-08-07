import "cypress-file-upload";

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:8000/api/login",
    body: {
      name: "test@test.com",
      password: "validpass123",
    },
  }).then((resp) => {
    console.log(resp);
    window.localStorage.setItem("token", resp.body.access_token);
    window.localStorage.setItem("user_email", resp.body.user_email);
    window.localStorage.setItem(
      "expire_time",
      Date.now() + resp.body.expires_in * 1000
    );
  });
});
