import { ThunkConfig } from 'app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { articlesPageActions } from '../../slice/articlesPageSlice'
import { SortOrder } from 'shared/types'
import { ArticleSortField, ArticleType } from 'entities/Article'

export const initArticlePage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlePage', async (searchParams, thunkApi) => {
  const { getState, dispatch } = thunkApi

  const inited = getArticlesPageInited(getState())

  if (!inited) {
    dispatch(
      articlesPageActions.setOrder(
        (searchParams.get('order') as SortOrder) ?? 'asc'
      )
    )
    dispatch(
      articlesPageActions.setSort(
        (searchParams.get('sort') as ArticleSortField) ??
          ArticleSortField.CREATED
      )
    )
    dispatch(articlesPageActions.setSearch(searchParams.get('search') ?? ''))
    dispatch(
      articlesPageActions.setType(
        (searchParams.get('type') as ArticleType) ?? ArticleType.ALL
      )
    )
    dispatch(articlesPageActions.initState())
    dispatch(fetchArticlesList({}))
  }
})
