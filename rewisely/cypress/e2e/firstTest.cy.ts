export {};

import 'cypress-file-upload';
import 'cypress-file-upload';

describe('UploadButton Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-in');

    cy.get('input[name="email"]').type('Nada@gmail.com');
    cy.get('input[name="password"]').type('Nada12345');

    cy.contains('Sign in').click();

   
    cy.url().should('not.eq', 'http://localhost:3000/sign-in'); 
    cy.url().should('eq', 'http://localhost:3000/').then(() => {
      
      cy.visit('http://localhost:3000/text-summary');

      cy.url().should('include', '/text-summary').then(() => {
      
      });
    });
  });

  it('can upload a file and submit form', () => {
    
    cy.get('input[type="file"]').should('exist');

    const fileName = 'test.txt';
    const filePath = 'test.txt';

    cy.get('input[type="file"]').attachFile({
      filePath: filePath,
      fileName: fileName,
      mimeType: 'text/plain'
    });

    cy.contains(fileName).should('be.visible');

    cy.contains('Upload').click();

    cy.get('.loading-spinner').should('not.exist');

    cy.contains('Summary').should('be.visible');
  });
});
