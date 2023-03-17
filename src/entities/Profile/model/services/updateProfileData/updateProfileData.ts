import { ThunkConfig } from 'app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Profile, ValidateProfileError } from '../../types/profile'
import { getprofileForm } from '../../selectors/getProfileForm/getprofileForm'
import { validateProfileData } from '../validateProfileData/validateProfileData'

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData = getprofileForm(getState())

  const errors = validateProfileData(formData)

  if (errors.length) {
    return rejectWithValue(errors)
  }

  try {
    const response = await extra.api.put<Profile>('/profile', formData)

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
    return rejectWithValue([ValidateProfileError.SERVER_ERROR])
  }
})
