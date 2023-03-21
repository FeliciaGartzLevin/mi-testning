/**
 * @vitest-environment happy-dom
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
// import mockLocalStorage from '../mocks/mockedLocalStorage'
import { Todo } from '../types/Todo'
import { getTodos, saveTodos } from '../utils/todoStorage'

// global.localStorage = mockLocalStorage()

const TODO: Todo = {
	id: 1,
	title: 'My first todo',
	completed: false,
}

describe('get todos', () => {
	it('returns empty list of todos', () => {
		// i spy
		const getItemSpy = vi.spyOn(global.localStorage, 'getItem')

		const todos = getTodos()

		expect(getItemSpy).toHaveBeenCalled()
		expect(todos.length).toBe(0)
	})
})

describe('save todos', () => {

	afterEach(() => {
		global.localStorage.clear()
	})

	it.todo('can save a todo', () => {
		const result = saveTodos([TODO])

		expect(result.success).toBe(true)
	})

	it.todo('can save a todo and then get it', () => {
		const result = saveTodos([TODO])

		expect(result.success).toBe(true)

		const todos = getTodos()
		expect(todos).toContainEqual(TODO)
	})
})
