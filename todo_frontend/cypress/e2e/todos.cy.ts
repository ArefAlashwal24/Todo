it("adds, toggles, and deletes a todo (green)", () => {
  cy.visit("/");

  // wait for initial load (GET /todos)
  cy.intercept("GET", "http://localhost:3001/todos").as("load");
  cy.reload();
  cy.wait("@load");

  // add
  cy.intercept("POST", "http://localhost:3001/todos").as("create");
  cy.get('[data-testid="new-title"]').type("Buy milk");
  cy.get('[data-testid="add-btn"]').click();
  cy.wait("@create"); // ensure backend replied

  // now the <li data-testid="todo-item"> should be in the DOM
  cy.contains('[data-testid="todo-item"]', "Buy milk", { timeout: 10000 }).should("exist");

  // toggle
  cy.intercept("PATCH", /http:\/\/localhost:3001\/todos\/\d+$/).as("update");
  cy.contains('[data-testid="todo-item"]', "Buy milk").find('[data-testid="toggle"]').click();
  cy.wait("@update");

  // delete
  cy.intercept("DELETE", /http:\/\/localhost:3001\/todos\/\d+$/).as("destroy");
  cy.contains('[data-testid="todo-item"]', "Buy milk").find('[data-testid="del-btn"]').click();
  cy.wait("@destroy");

  cy.contains('[data-testid="todo-item"]', "Buy milk").should("not.exist");
});
