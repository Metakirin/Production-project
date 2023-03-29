import { ThunkConfig } from 'app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Profile } from '../../types/profile'

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<Profile>('/profile/' + profileId)

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
    return rejectWithValue('error')
  }
})
