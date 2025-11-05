it("adds, toggles, deletes", () => {
  cy.visit("/");
  cy.intercept("GET", "http://localhost:3001/todos").as("load"); cy.reload(); cy.wait("@load");
  cy.intercept("POST", "http://localhost:3001/todos").as("create");
  cy.get('[data-testid="new-title"]').type("Buy milk");
  cy.get('[data-testid="add-btn"]').click();
  cy.wait("@create");
  cy.contains('[data-testid="todo-item"]', "Buy milk", { timeout: 10000 }).should("exist");
  cy.intercept("PATCH", /\/todos\/\d+$/).as("update");
  cy.contains('[data-testid="todo-item"]', "Buy milk").find('[data-testid="toggle"]').click();
  cy.wait("@update");
  cy.intercept("DELETE", /\/todos\/\d+$/).as("destroy");
  cy.contains('[data-testid="todo-item"]', "Buy milk").find('[data-testid="del-btn"]').click();
  cy.wait("@destroy");
  cy.contains('[data-testid="todo-item"]', "Buy milk").should("not.exist");
});
