describe('Authenticator:', function() {
    // Step 1: setup the application state
    beforeEach(function() {
      cy.visit('/');
    });
    
    describe('Sign In:', () => {
      it('allows a user to signin', () => {
        // Step 2: Take an action (Sign in)
        cy.get(selectors.usernameInput).type("example1");  //#template:  "__AppUserName__"
        cy.get(selectors.signInPasswordInput).type("12345a_A");  //#template: "__AppUserPassword__"
        cy.get(selectors.signInSignInButton).click();
  
        // Step 3: Make an assertion
          cy.get('h1').contains('Hello');
      });
    });
  
  });
  export const selectors = {
    // Auth component classes
    usernameInput: '[data-test="username-input"]',
    signInPasswordInput: '[data-test="sign-in-password-input"]',
    signInSignInButton: '[data-test="sign-in-sign-in-button"]',
    signOutButton: '[data-test="sign-out-button"]'
  }
