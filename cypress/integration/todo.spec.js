describe("todoApp", () => {
    beforeEach(() => {
        cy.visit("http:localhost:4200/");
    });

    it("should add a new todo", () => {
        cy.get("input[type = 'text']").type("Todo 1", {delay: 300});
        cy.get("textarea").type("Description 1", {delay: 300});
        cy.get("input[type = 'datetime-local']").type("2021-08-09T20:30");
        cy.get("button[type = 'submit']").click();
    });
})