import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { ArticleDetailsRecommendationsSchema } from '../types/articleDetailsRecommendationsSchema'
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations'

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id
})

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsPage?.recommendations ||
      recommendationsAdapter.getInitialState()
  )

export const artilceDetailsPageRecommendationsSlice = createSlice({
  name: 'artilceDetailsPageRecommendationsSlice',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
      }
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state, { payload }) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticleRecommendations.fulfilled,
        (state, { payload }: PayloadAction<Article[]>) => {
          state.isLoading = false
          recommendationsAdapter.setAll(state, payload)
        }
      )
      .addCase(fetchArticleRecommendations.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
  }
})

export const { actions: artilceDetailsPageRecommendationsActions } =
  artilceDetailsPageRecommendationsSlice
export const { reducer: artilceDetailsPageRecommendationsReducer } =
  artilceDetailsPageRecommendationsSlice
