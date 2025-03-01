describe('when admin user is logged in', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    it('admin user should be able to create a new hero', () => {
        cy.get("nav button").contains('Login').click();
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("nav button.bg-blue-700").contains('Create New Hero').click();
        cy.get("form").should('be.visible');
        cy.get("[data-cy='nameInput']").type('TS Glorious');
        cy.get("[data-cy='priceInput']").type('57');
        cy.get("[data-cy='fansInput']").type('73');
        cy.get("[data-cy='savesInput']").type('62');
        cy.get("[name='powers']").select('6');
        cy.get("form button.bg-blue-700").contains('Submit').click();
        cy.get("[data-cy='hero-card']").contains('TS Glorious').should('be.visible');
    });

    it('admin user should be able to decline deleting a hero', () => {
        cy.get("nav button").contains('Login').click();
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("[data-cy='hero-card']").contains('TS Glorious').should('be.visible');
        cy.get("[data-cy='hero-card'] button[data-cy='trash']").eq(5).click();
        cy.get(".bg-white").contains('Delete Hero?').should('be.visible');
        cy.get(".bg-white button.border-gray-300").contains('No').click();
    });

    it('admin user should be able to delete a hero', () => {
        cy.get("nav button").contains('Login').click();
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("[data-cy='hero-card']").contains('TS Glorious').should('be.visible');
        cy.get("[data-cy='hero-card'] button[data-cy='trash']").eq(5).click();
        cy.get(".bg-white").contains('Delete Hero?').should('be.visible');
        cy.get(".bg-white button.bg-red-600").contains('Yes').click();
    });

});