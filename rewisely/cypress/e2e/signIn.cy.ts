export {};

import 'cypress-file-upload';


describe('Sign in', () => {
    it('should successfully sign in with valid credentials', () => {
      // Visit the sign-in page
      cy.visit('http://localhost:3000/sign-in');
  
    
      cy.get('input[name="email"]').type('Nada@gmail.com');
      cy.get('input[name="password"]').type('Nada12345');
  
      cy.contains('Sign in').click();
  
      // Assert that the URL changes after successful sign-in 
      cy.url().should('not.contain', '/sign-in');
  
      
    });
  });
  