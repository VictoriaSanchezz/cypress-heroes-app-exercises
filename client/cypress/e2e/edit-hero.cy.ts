describe('when admin user is logged in', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    it('admin user should be able to edit a hero', () => {
        cy.get("nav button").contains('Login').click();
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("[data-cy='hero-card'] button[data-cy='pencil']").eq(1).click();
        cy.get("form").should('be.visible');
        cy.get("[data-cy='priceInput']").clear().type('60');
        cy.get("[data-cy='fansInput']").clear().type('72');
        cy.get("[data-cy='savesInput']").clear().type('84');
        cy.get("form button.bg-blue-700").contains('Submit').click();
    });

    it('the edited information should be displayed on start page', () => {
        cy.get("[data-cy='hero-card']").eq(1).contains('Warp Speed');
        cy.get("[data-cy='hero-card'] [data-cy='price']").eq(1).contains('$60').should('be.visible');
        cy.get("[data-cy='hero-card'] [data-cy='fans']").eq(1).contains('72').should('be.visible');
        cy.get("[data-cy='hero-card'] [data-cy='saves']").eq(1).contains('84').should('be.visible');
    });

});