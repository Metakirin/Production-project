import { fetchProfileData } from './../services/fetchProfileData/fetchProfileData'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

const initialState: ProfileSchema = {
  isLoading: false,
  readOnly: true,
  error: undefined,
  data: undefined,
  validateError: undefined
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadOnly: (state, action: PayloadAction<boolean>) => {
      state.readOnly = action.payload
    },
    cancelEdit: (state) => {
      state.readOnly = true
      state.validateError = undefined
      state.form = state.data
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state, { payload }) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, { payload }: PayloadAction<Profile>) => {
          state.isLoading = false
          state.data = payload
          state.form = payload
        }
      )
      .addCase(fetchProfileData.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(updateProfileData.pending, (state, { payload }) => {
        state.validateError = undefined
        state.isLoading = true
      })
      .addCase(
        updateProfileData.fulfilled,
        (state, { payload }: PayloadAction<Profile>) => {
          state.isLoading = false
          state.data = payload
          state.form = payload
          state.readOnly = true
          state.validateError = undefined
        }
      )
      .addCase(updateProfileData.rejected, (state, { payload }) => {
        state.isLoading = false
        state.validateError = payload
      })
  }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
