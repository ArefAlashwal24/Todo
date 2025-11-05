it("intentional failure demo", () => {
  cy.visit("/");
  cy.get('[data-testid="new-title"]').type("Buy eggs");
  cy.get('[data-testid="add-btn"]').click();
  // Wrong expectation on purpose
  cy.contains('[data-testid="todo-item"]', "Buy oranges").should("exist");
});
