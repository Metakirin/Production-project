import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleSortSelector.module.scss'
import { Select, SelectOption } from 'shared/ui/Select/Select'
import { ArticleSortField } from 'entities/Article/model/types/article'
import { SortOrder } from 'shared/types'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props
  const { t } = useTranslation()

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      { value: 'asc', content: t('ascending') },
      { value: 'desc', content: t('descending') }
    ],
    [t]
  )
  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      { value: ArticleSortField.CREATED, content: t('created at') },
      { value: ArticleSortField.TITLE, content: t('title') },
      { value: ArticleSortField.VIEWS, content: t('views') }
    ],
    [t]
  )

  return (
    <div className={classNames(cls.articleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        label={t('Sort')}
        options={sortFieldOptions}
        onChange={onChangeSort}
        value={sort}
      />
      <Select<SortOrder>
        label={t('by')}
        options={orderOptions}
        onChange={onChangeOrder}
        value={order}
        className={cls.order}
      />
    </div>
  )
})
