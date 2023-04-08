import { ReactNode, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Tabs.module.scss'
import { Card, CardTheme } from '../Card/Card'
import { typedMemo } from 'shared/types'

export interface TabItem<T extends string> {
  value: T
  content: ReactNode
}

interface TabsProps<T extends string> {
  className?: string
  tabs: TabItem<T>[]
  value: T
  onTabClick: (tab: TabItem<T>) => void
}

export const Tabs = typedMemo(<T extends string>(props: TabsProps<T>) => {
  const { className, onTabClick, tabs, value } = props
  const { t } = useTranslation()

  const clickHandle = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab)
    },
    [onTabClick]
  )

  return (
    <div className={classNames(cls.tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          className={cls.tab}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  )
})
