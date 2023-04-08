import { combineReducers } from '@reduxjs/toolkit'
import { ArticleDetailsPageSchema } from '../types'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'
import { artilceDetailsPageRecommendationsReducer } from './artilceDetailsPageRecommendationsSlice'

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    comments: articleDetailsCommentsReducer,
    recommendations: artilceDetailsPageRecommendationsReducer
  })
