import { MutableRefObject, useEffect, useRef } from 'react'

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
  isTriggerVisible?: boolean
}

export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
  isTriggerVisible
}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current

    if (callback && isTriggerVisible) {
      const options = {
        root: wrapperElement,
        rootMargin: '20px 20px 20px 45px',
        threshold: 1.0
      }

      observer.current = new IntersectionObserver(([enrty]) => {
        if (enrty.isIntersecting) {
          callback()
        }
      }, options)

      observer.current.observe(triggerElement)
    }

    return () => {
      if (observer.current && triggerElement) {
        // eslint-disable-next-line
        observer.current.unobserve(triggerElement)
      }
    }
  }, [wrapperRef, triggerRef, callback, isTriggerVisible])
}
