const insertTodo = 'Make e2e test'

describe('Todos', () => {

	context('initial state', () => {

		beforeEach(() => {
			// this is like MSW built in to Cypress. So the request goes to our mock json instead of the actual backend.
			// intercept GET requests to http://localhost:3001/todos
			cy.intercept('GET', 'http://localhost:3001/todos', {
				fixture: 'todos.json',
			})

			cy.visit('/')
		})

		it('should see the two mocked todos', () => {
			cy.get('#todos')
				.find('li')
				.should('have.length', 2)

			cy.get('#todos')
				.find('li')
				.first()
				.should('have.class', 'completed')
				.contains('My first todo')

			cy.get('#todos')
				.find('li')
				.last()
				.should('not.have.class', 'completed')
				.contains('My second todo')
		})
	})

	context('create todo', () => {
		beforeEach(() => {
			cy.visit('/')
		})

		it('create todo form should be empty', () => {
			cy.get('#new-todo-title')
				.should('be.empty')
				.should('have.value', '')
		})

		it('cant create a todo without a title', () => {

			// cy.get('#new-todo-title').type('{enter}') //johans lösning
			// .should('be.empty') //mina lösningar. 'be.empty' funkar inte för att om man skrivit value="My todo" i htmlen så står det som default i rutan
			// .should('have.value', '') //mina lösningar
			cy.get('[type="submit"]').click() // min lösning: cy.get('.btn-success').click()
			cy.get('#error')
				.should('be.visible')
				.contains('Title cannot be empty')
		})

		it('can create a new todo (and see it in the list and clears input)', () => {

			// enter todo title and submit form
			cy.get('#new-todo-title').type(insertTodo)
			cy.get('[type="submit"]').click()

			// check that a todo with the title exists in the list
			cy.get('#todos').contains(insertTodo) //kan kedja .find('li).last() också

			// expect input to be empty
			cy.get('#new-todo-title').should('be.empty')

		})

		it('can type in the create todo form and then reset the form', () => {

			cy.get('#new-todo-title').type(insertTodo)
			cy.get('[type="reset"]').click()
			cy.get('#new-todo-title')
				.should('have.value', '') //mina lösningar. 'be.empty' funkar inte för att om man skrivit value="My todo" i htmlen så står det som default i rutan, även efter man klickat på reset.

		})
	})


})
