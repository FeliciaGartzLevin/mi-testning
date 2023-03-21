import { Window } from 'happy-dom'
import { afterEach, describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";
import dummyTodos from "./testdata/todos";

const { document } = new Window()

describe('render todos', () => {

	afterEach(() => {
		document.body.innerHTML = ''
	})

	it('outputs an empty list when no todos exists', () => {
		const html = transformTodosToHtml([])

		expect(html).toBe('')
	})

	it('outputs a list with one todo', () => {
		const todoLIs = transformTodosToHtml([dummyTodos[0]])

		document.body.innerHTML = `<ul>${todoLIs}</ul>`

		expect(document.querySelectorAll('li.todo').length).toBe(1)
	})

	it('outputs a list with one completed todo', () => {
		// find the first completed todo
		let completedTodo = dummyTodos.find(todo => todo.completed)
		if (!completedTodo) {
			completedTodo = {
				...dummyTodos[0],
				completed: true,
			}
		}

		const todoLIs = transformTodosToHtml([completedTodo])

		document.body.innerHTML = `<ul>${todoLIs}</ul>`

		expect(document.querySelectorAll('li.todo.completed').length).toBe(1)

	})

	it('outputs a list with many todos', () => {
		const todoLIs = transformTodosToHtml(dummyTodos)

		document.body.innerHTML = `<ul>${todoLIs}</ul>`

		expect(document.querySelectorAll('li.todo').length).toBe(dummyTodos.length)
	})
})
