describe('My First Test', () => {
  it('Visits the initial project page and display welcome message', () => {
    cy.visit('/')
    cy.contains('LocalCast Weather')
  })
})
