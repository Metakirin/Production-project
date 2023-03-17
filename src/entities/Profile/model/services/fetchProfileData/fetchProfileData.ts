import { ThunkConfig } from 'app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Profile } from '../../types/profile'

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>('profile/fetchProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<Profile>('/profile')

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
    return rejectWithValue('error')
  }
})
