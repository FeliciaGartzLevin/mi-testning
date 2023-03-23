import { afterAll, afterEach, beforeAll, describe, it, expect, } from 'vitest'
import { server } from '../mocks/server'
import * as TodoAPI from '../services/TodoAPI'
import { CreateTodoData, UpdateTodoData } from '../types/Todo'

// 🏎️ Boot API mocking
beforeAll(() => {
	server.listen()
})

// 🧨 Reset handlers
afterEach(() => {
	server.resetHandlers()
})

// 🧹 Clean up after ourselves
afterAll(() => {
	server.close()
})


const newTodo: CreateTodoData = {
	title: 'Test todo',
	completed: false,
}

describe('TodoAPI', () => {

	it('should return a list', async () => {
		const todos = await TodoAPI.getTodos()

		expect(Array.isArray(todos)).toBe(true)
	})


	it('should create a todo', async () => {

		const todo = await TodoAPI.createTodo(newTodo)

		// testa allt nedan i en och samma expect:
		expect(todo).toMatchObject({
			id: expect.any(Number),
			title: newTodo.title,
			completed: newTodo.completed,
		})

		// testa i flera expects:
		// expect(todo.id).toBeTypeOf('number')
		// expect(todo.title).toBe(newTodo.title)
		// expect(todo.completed).toBe(newTodo.completed)

	})

	it('should create and then get the todo', async () => {

		const todo = await TodoAPI.createTodo(newTodo)
		const fetchedTodo = await TodoAPI.getTodo(todo.id)

		expect(fetchedTodo).toEqual(todo)

	})


	it('should create and then find the todo among all todos', async () => {

		const todo = await TodoAPI.createTodo(newTodo)
		const fetchedTodos = await TodoAPI.getTodos()

		// min lösning:
		// const foundTodo = fetchedTodos.find(foundtodo => todo.id === foundtodo.id)
		// expect(foundTodo).toEqual(todo)

		// johans lösning:
		expect(fetchedTodos).toContainEqual(todo)

	})

	it('should create and then update the todo', async () => {

		const todo = await TodoAPI.createTodo(newTodo)

		const updatedTodo = await TodoAPI.updateTodo(todo.id, {
			title: 'Stop testing',
			completed: true
		})

		expect(updatedTodo).toMatchObject({
			id: todo.id,
			title: 'Stop testing',
			completed: true,
		})

	})

	it('should create and then delete the todo', async () => {
		const todo = await TodoAPI.createTodo(newTodo)

		await TodoAPI.deleteTodo(todo.id)

		const todos = await TodoAPI.getTodos()

		expect(todos).not.toContainEqual(todo)

	})

})
