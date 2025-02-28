describe('when admin user is logged in', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    it('admin user should be able to click like on a hero', () => {
        cy.get("nav button").contains('Login').click();
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("button[data-cy='like']").eq(2).click().should('be.visible');
    });

    it('admin user should be able to hire a hero', () => {
        cy.get("nav button").click();
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("[data-cy='money']").eq(2).click();
        cy.get(".bg-white .text-lg").contains('Hire Hero?');
        cy.get(".bg-white button.bg-red-600").contains('Yes').click();
    });

    it('admin user should be able to decline hiring a hero', () => {
        cy.get("nav button").click();
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("[data-cy='money']").eq(2).click();
        cy.get(".bg-white .text-lg").contains('Hire Hero?');
        cy.get(".bg-white button.border-gray-300").contains('No').click();
    });

    it('clicking edit on a hero should redirect to edit page', () => {
        cy.get("nav button").click();
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("button[data-cy='pencil']").eq(2).click();  
    });

    it('admin user should be able to logout', () => {
        cy.get("nav button").click();
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("nav button").contains('Logout').click();
    });
});