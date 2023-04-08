import { ThunkConfig } from 'app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Article } from 'entities/Article'

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>('articleDetailsPage/fetchArticleRecommendations', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _expand: 'user',
        _limit: 4
      }
    })

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
    return rejectWithValue('error')
  }
})
