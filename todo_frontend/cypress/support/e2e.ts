beforeEach(() => {
  const API = "http://localhost:3001";
  cy.request("GET", `${API}/todos`).then((res) => {
    (res.body as Array<{id:number}>).forEach(t => {
      cy.request("DELETE", `${API}/todos/${t.id}`);
    });
  });
});
