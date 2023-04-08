import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timeoutRef = useRef() as MutableRefObject<any>

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}
