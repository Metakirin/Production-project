import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleType } from 'entities/Article'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'

interface ArticleTypeTabsProps {
  className?: string
  value: ArticleType
  onChangeType: (tab: TabItem<ArticleType>) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props
  const { t } = useTranslation()

  const typeTabs = useMemo(
    () =>
      Object.values(ArticleType).reduce(
        (acc: TabItem<ArticleType>[], cur) => [
          ...acc,
          { value: cur, content: t(cur, { ns: 'articles' }) }
        ],
        []
      ),
    [t]
  )

  return (
    <Tabs<ArticleType>
      className={classNames('', {}, [className])}
      tabs={typeTabs}
      value={value}
      onTabClick={onChangeType}
    />
  )
})
