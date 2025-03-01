describe('when not logged in', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('clicking on like should alert the user they need to login', () => {
        cy.get("button[data-cy='like']").eq(4).click();
        cy.get(".rounded-md").contains('You must log in to like.').should('be.visible');
        cy.get(".bg-white button").contains('Ok').click();
    });

    it('clicking on hire should alert the user they need to login', () => {
        cy.get("button[data-cy='money']").eq(4).click();
        cy.get(".rounded-md").contains('You must log in to hire this hero.').should('be.visible');
        cy.get(".bg-white button").contains('Ok').click();
    });

    it('trying to login with wrong credentials should generate an alert', () => {
        cy.get("nav button").contains('Login').click();
        cy.get("[type='email']").type('test@hero.com');
        cy.get("[type='password']").type('test1234');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("form .text-red-500").contains('Invalid email or password').should('be.visible');
    });
});