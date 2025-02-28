describe('when normal user is logged in', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('normal user should be able to click like on a hero', () => {
        cy.get("nav button").contains('Login').click();
        cy.get("[type='email']").type('test@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("button[data-cy='like']").eq(4).click().should('be.visible');
    });

    it('normal user should be able to hire a hero', () => {
        cy.get("nav button").click();
        cy.get("[type='email']").type('test@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("[data-cy='money']").eq(4).click();
        cy.get(".bg-white .text-lg").contains('Hire Hero?');
        cy.get(".bg-white button.bg-red-600").contains('Yes').click();
    });

    it('normal user should be able to decline hiring a hero', () => {
        cy.get("nav button").click();
        cy.get("[type='email']").type('test@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("[data-cy='money']").eq(4).click();
        cy.get(".bg-white .text-lg").contains('Hire Hero?');
        cy.get(".bg-white button.border-gray-300").contains('No').click();
    });

    it('normal user should be able to logout', () => {
        cy.get("nav button").click();
        cy.get("[type='email']").type('test@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("nav button").contains('Logout').click();
    });
});
