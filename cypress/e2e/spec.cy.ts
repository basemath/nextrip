describe('Canary test', () => {
  it('Visits the initial project page and checks some header text', () => {
    cy.visit('/');
    cy.contains('Real-Time Departures');
  });
});

describe('Happy path', () => {
  it('Does a basic route, direction, and stop selection', () => {
    cy.visit('/');
    cy.get('[data-cy="route-select"]').select('METRO Blue Line');
    cy.get('[data-cy="direction-select"]').select('Northbound');
    cy.get('[data-cy="stop-select"]').select(
      'MSP Airport Terminal 2 - Humphrey Station'
    );

    cy.contains('Terminal 2 Humphrey Station');
    cy.contains('Stop #: 51435');
    cy.contains('Blue');
    cy.contains('to Mpls-Target Field');
  });
});

describe('Route URL test', () => {
  it('Navigates to the URL for a specific route, direction, and stop, and checks that components loaded', () => {
    cy.visit('/byRoute/901/0/HHTE');

    cy.get('[data-cy="route-select"]').contains('METRO Blue Line');
    cy.get('[data-cy="direction-select"]').contains('Northbound');
    cy.get('[data-cy="stop-select"]').contains(
      'MSP Airport Terminal 2 - Humphrey Station'
    );

    cy.contains('Terminal 2 Humphrey Station');
    cy.contains('Stop #: 51435');
    cy.contains('Blue');
    cy.contains('to Mpls-Target Field');
  });
});
