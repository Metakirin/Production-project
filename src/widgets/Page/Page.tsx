import {
  MutableRefObject,
  ReactNode,
  UIEvent,
  memo,
  useLayoutEffect,
  useRef
} from 'react'

import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ScrollSaveActions, getScrollSaveByPath } from 'features/ScrollSave'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
  isTriggerVisible?: boolean
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd, isTriggerVisible } = props
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const scrollPosition = useSelector((state: StateSchema) =>
    getScrollSaveByPath(state, pathname)
  )

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      ScrollSaveActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname
      })
    )
  }, 500)

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
    isTriggerVisible
  })

  useLayoutEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd && isTriggerVisible ? (
        <div className={cls.trigger} ref={triggerRef} />
      ) : null}
    </section>
  )
})
