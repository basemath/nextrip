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
  });
});
