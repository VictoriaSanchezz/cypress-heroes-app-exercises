describe('all tests in unique run', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    it('when not logged in', () => {

        //when not logged in, clicking like on a hero should alert the user they need to log in;

        cy.get("body [href='/'] [alt='Cypress Heroes Logo']").should('be.visible');
        cy.get("button[data-cy='like']").eq(4).click();
        cy.get(".rounded-md").contains('You must log in to like.').should('be.visible');
        cy.get(".bg-white button").contains('Ok').click();
    
        //when not logged in, clicking hire on a hero should alert the user they need to log in;
    
        cy.get("button[data-cy='money']").eq(4).click();
        cy.get(".rounded-md").contains('You must log in to hire this hero.').should('be.visible');
        cy.get(".bg-white button").contains('Ok').click();
    
        //trying to log in with wrong credentials should generate an 'Invalid email or password' alert;
    
        cy.get("nav button").contains('Login').click();
        cy.get(".bg-white .text-xl").contains('Login').should('be.visible');
        cy.get("[type='email']").type('test@hero.com');
        cy.get("[type='password']").type('test1234');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("form .text-red-500").contains('Invalid email or password').should('be.visible');
    });

    it('when normal user is logged in', () => {

        //normal user should be able to click like on a hero;

        cy.get("body [href='/'] [alt='Cypress Heroes Logo']").should('be.visible');
        cy.get("nav button").contains('Login').click();
        cy.get(".bg-white .text-xl").contains('Login').should('be.visible');
        cy.get("[type='email']").type('test@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("button[data-cy='like']").eq(4).click();

        //normal user should be able to hire a hero;

        cy.get("[data-cy='money']").eq(4).click();
        cy.get(".bg-white .text-lg").contains('Hire Hero?').should('be.visible');
        cy.get(".bg-white button.bg-red-600").contains('Yes').click();

        //normal user should be able to decline hiring a hero;

        cy.get("[data-cy='money']").eq(3).click();
        cy.get(".bg-white .text-lg").contains('Hire Hero?').should('be.visible');
        cy.get(".bg-white button.border-gray-300").contains('No').click();

        //normal user should be able to logout;

        cy.get("nav button").contains('Logout').click();
        cy.get("nav button").contains('Login').should('be.visible');
    });

    it.only('when admin user is logged in', () => {

        //admin user should be able to click like on a hero;

        cy.get("body [href='/'] [alt='Cypress Heroes Logo']").should('be.visible');
        cy.get("nav button").contains('Login').click();
        cy.get(".bg-white .text-xl").contains('Login').should('be.visible');
        cy.get("[type='email']").type('admin@test.com');
        cy.get("[type='password']").type('test123');
        cy.get("form button.bg-blue-700").contains('Sign in').click();
        cy.get("button[data-cy='like']").eq(2).click().should('be.visible');

        //admin user should be able to hire a hero;

        cy.get("[data-cy='money']").eq(2).click();
        cy.get(".bg-white .text-lg").contains('Hire Hero?').should('be.visible');
        cy.get(".bg-white button.bg-red-600").contains('Yes').click();

        //admin user should be able to decline hiring a hero;

        cy.get("[data-cy='money']").eq(3).click();
        cy.get(".bg-white .text-lg").contains('Hire Hero?').should('be.visible');
        cy.get(".bg-white button.border-gray-300").contains('No').click();

        //clicking edit on a hero should redirect to edit page and admin user should be able to edit the hero;

        cy.get("[data-cy='hero-card'] button[data-cy='pencil']").eq(1).click();
        cy.get("form").should('be.visible');
        cy.get("[data-cy='priceInput']").clear().type('60');
        cy.get("[data-cy='fansInput']").clear().type('72');
        cy.get("[data-cy='savesInput']").clear().type('84');
        cy.get("form button.bg-blue-700").contains('Submit').click();

        //the hero edited information should be displayed on start page;

        cy.get("[data-cy='hero-card']").eq(1).contains('Warp Speed');
        cy.get("[data-cy='hero-card'] [data-cy='price']").eq(1).contains('$60').should('be.visible');
        cy.get("[data-cy='hero-card'] [data-cy='fans']").eq(1).contains('72').should('be.visible');
        cy.get("[data-cy='hero-card'] [data-cy='saves']").eq(1).contains('84').should('be.visible');

        //admin user should be able to create a new hero;

        cy.get("nav button.bg-blue-700").contains('Create New Hero').click();
        cy.get("form").should('be.visible');
        cy.get("[data-cy='nameInput']").type('Coding Boy');
        cy.get("[data-cy='priceInput']").type('50');
        cy.get("[data-cy='fansInput']").type('63');
        cy.get("[data-cy='savesInput']").type('79');
        cy.get("[name='powers']").select('4');
        cy.get("[data-cy='avatarFile']").selectFile('cypress/fixtures/coding-boy-avatar.jpg');
        cy.get("form button.bg-blue-700").contains('Submit').click();
        cy.get("[data-cy='hero-card']").contains('Coding Boy').should('be.visible');

        //admin user should be able to decline deleting a hero;

        cy.get("[data-cy='hero-card'] button[data-cy='trash']").eq(5).click();
        cy.get(".bg-white").contains('Delete Hero?').should('be.visible');
        cy.get(".bg-white button.border-gray-300").contains('No').click();

        //admin user should be able to delete a hero;

        cy.get("[data-cy='hero-card']").contains('Coding Boy').should('be.visible');
        cy.get("[data-cy='hero-card'] button[data-cy='trash']").eq(5).click();
        cy.get(".bg-white").contains('Delete Hero?').should('be.visible');
        cy.get(".bg-white button.bg-red-600").contains('Yes').click();

        //admin user should be able to logout;

        cy.get("nav button").contains('Logout').click();
        cy.get("nav button").contains('Login').should('be.visible');
    });
});