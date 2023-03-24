describe('Newsletter Subscribe', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('allows users to subscribe to the email list', () => {
		cy.getByDataTest('email-input')
	})
})
