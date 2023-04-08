import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article'
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles
} from '../../model/slice/articlesPageSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import cls from './ArticlesPage.module.scss'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'

import { useSelector } from 'react-redux'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import { Page } from 'widgets/Page/Page'
import { fetchNextArticleList } from '../../model/services/fetchNextArticleList/fetchNextArticleList'
import { initArticlePage } from '../../model/services/initArticlePage/initArticlePage'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { useSearchParams } from 'react-router-dom'

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)

  const isTriggerVisible = isLoading ? false : true

  const onLoadNextPart = useCallback(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchNextArticleList())
    }
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlePage(searchParams))
  })

  if (error) {
    console.log('error fetching articles list')
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page
        onScrollEnd={onLoadNextPart}
        isTriggerVisible={isTriggerVisible}
        className={classNames(cls.articlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleList
          articles={articles}
          isLoading={isLoading}
          view={view}
          className={cls.list}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
