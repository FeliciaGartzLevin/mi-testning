const insertTodo = 'Make e2e test'

describe('Todos', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should see at least one todo', () => {
		cy.get('#todos')
			.find('li')
			.should('have.length.at.least', 1)
	})

	context('create todo', () => {

		it('create todo form should be empty', () => {
			cy.get('#new-todo-title')
				.should('be.empty')

		})

		it('cant create a todo without a title', () => {

			cy.get('#new-todo-title').should('be.empty')
			cy.get('.btn-success').click()
			cy.get('#error').should('exist').contains('Title cannot be empty')
		})

		it('can create a new todo (and see it in the list and clears input)', () => {
			cy.get('#new-todo-title').type(insertTodo)
			cy.get('.btn-success').click()
			cy.get('#todos').contains(insertTodo)

		})

		it('can type in the create todo form and then reset the form', () => {
			cy.get('#new-todo-title').type(insertTodo)
			cy.get('.btn-warning').click()
			cy.get('#new-todo-title')
				.should('be.empty')

		})
	})


})
