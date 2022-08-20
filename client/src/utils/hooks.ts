import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

/**
 * A hook similar to useState, but with boolean values.\
 * It returns the boolean value, a function to toggle it, a function to set it to true, and a function to set it to false.
 */
export const useBoolean = (initialValue = false) => {
	const [value, setValue] = useState(initialValue)

	const toggle = useCallback(() => setValue(v => !v), [])
	const setTrue = useCallback(() => setValue(true), [])
	const setFalse = useCallback(() => setValue(false), [])

	return { value, toggle, setTrue, setFalse }
}

/**
 * Calls a function when the component did just mount.
 */
export const useDidMount = (callback: () => void) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, [])
}

/**
 * Calls a function just before the component will unmount.
 */
export const useWillUnmount = (callback: () => void) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => callback, [])
}

/**
 * Similar to addEventListener, but removes the event listener when the component unmounts.
 * @param event - the event name (e.g. 'click')
 * @param callback - the function to call
 * @param element - the element in which the event will be listened to (defaults to window)
 */
export const useEventListener = (
	event: string,
	callback: EventListenerOrEventListenerObject,
	element: HTMLElement | Document | Window = window
): void => {
	useEffect(() => {
		element.addEventListener(event, callback)

		return () => {
			element.removeEventListener(event, callback)
		}
	}, [event, element, callback])
}

/**
 * A hook that creates a fade-in fade-out animation.\
 * It returns a className (fadeTransition) that can be used directly in jsx, and a boolean (inDOM) that determines if the element is in the DOM.\
 * Make sure to wait for inDOM and show boolean to be false before removing the element.\
 * Example :
 * ```jsx
 * const { fadeTransition, inDOM } = useFadeTransition(show)
 * if (!show && !inDOM) {
 * 	return null
 * }
 * return (
 * 	<div className={fadeTransition}>...</div>
 * )
 * ```
 * @param show - a boolean value to determine if the element should be shown or not.
 * @param transitionDuration - the duration of the animation in milliseconds (default: 200ms).
 */
export const useFadeTransition = (show: boolean, transitionDuration = 200) => {
	const [inDOM, setInDOM] = useState(false)
	const visible = show && inDOM

	const useStyles = createUseStyles({
		fadeTransition: ({ visible }: { visible: boolean }) => ({
			transition: `opacity ${transitionDuration}ms linear`,
			opacity: visible ? 1 : 0
		})
	})

	useLayoutEffect(() => {
		if (inDOM !== show) {
			setTimeout(() => {
				setInDOM(show)
			}, show ? 0 : transitionDuration)
		}
	}, [show, inDOM, transitionDuration])

	const { fadeTransition } = useStyles({ visible })

	return { fadeTransition, inDOM }
}

/**
 * A hook similar to useState but who interacts with localStorage.\
 * It returns a stateful value, a function to update it and a function to delete it.\
 * TODO : listen to localStorage changes and update state
 * @param key - the key of the localStorage
 * @param initialValue - the initial value used if the localStorage doesn't exist yet.
 */
export const useLocalStorage = <T> (key: string, initialValue?: T) => {
	const [value, setValue] = useState<T | undefined>(() => {
		const item = window.localStorage.getItem(key)
		return item != null ? JSON.parse(item) : initialValue
	})

	const setItem = useCallback((value: T) => {
		window.localStorage.setItem(key, JSON.stringify(value))
		setValue(value)
	}, [key])

	const removeItem = useCallback(() => {
		window.localStorage.removeItem(key)
		setValue(undefined)
	}, [key])

	return [value, setItem, removeItem] as const
}
