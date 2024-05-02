
export {};
describe('Sign-up Form', () => {
    it('displays validation errors correctly', () => {
      cy.visit('http://localhost:3000/sign-up');
  

      cy.get('input[name="name"]').type('J'); 
      cy.get('input[name="email"]').type('invalidemail'); 
      cy.get('input[name="password"]').type('pass');
      cy.get('input[name="confirmPassword"]').type('password123'); 
  

      cy.contains('Sign up').click();

      cy.get('.border-red').contains('Name must be atleast 2 characters').should('be.visible', { timeout: 10000 });
      cy.get('.border-red').contains('Please enter a valid email address').should('be.visible', { timeout: 10000 });
      cy.get('.border-red').contains('Password must be at least 8 characters').should('be.visible', { timeout: 10000 });
      cy.get('.border-red').contains("Password and confirm password doesn't match!").should('be.visible', { timeout: 10000 });
    });
  });
  
  

  it('successfully submits the form with valid data', () => {
    cy.visit('http://localhost:3000/sign-up'); 
    cy.get('input[name="name"]').type('hala');
    cy.get('input[name="email"]').type('ayaollah831@gmail.com');
    cy.get('input[name="password"]').type('wzkg-NVz2-3Ccr-CRJp');
    cy.get('input[name="confirmPassword"]').type('wzkg-NVz2-3Ccr-CRJp');
  


 cy.contains('Sign up').click().then(() => {
    
    cy.get('.toast')
      .should('be.visible')
      .and('contain', 'Somthing went wrong!');
  }); 
  
 
  });
  

    
