/**
 * A (mostly correct) mock of localStorage
 */

const storage = new Map()

export default () => {
	return {
		getItem: (key: string) => storage.get(key),

		setItem: (key: string, value: string) => storage.set(key, value),

		// length
		length: storage.size,  // this won't update but isn't used in our app either

		// clear()
		clear: () => storage.clear(),

		// key()
		key: () => null,  // this won't work either, but also isn't used in our app

		// removeItem(key: string)
		removeItem: (key: string) => storage.delete(key),
	}
}
