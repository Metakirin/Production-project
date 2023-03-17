import { updateProfileData } from './../services/updateProfileData/updateProfileData'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ProfileSchema, ValidateProfileError } from './../types/profile'
import { profileActions, profileReducer } from './profileSlice'

const data = {
  first: 'Klim',
  lastname: 'Tsilha',
  age: 22,
  currency: Currency.USD,
  country: Country.USA,
  city: 'New York',
  username: 'admin'
}

describe('profileSlice.test', () => {
  test('test readOnly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readOnly: false
    }

    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadOnly(true))
    ).toEqual({ readOnly: true })
  })

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      data: data,
      form: { username: '' },
      readOnly: false,
      validateError: [ValidateProfileError.INCORRECT_USER_DATA]
    }

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({ data, form: data, readOnly: true, validateError: undefined })
  })

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { username: '123' }
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: '123456' })
      )
    ).toEqual({ form: { username: '123456' } })
  })

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateError: [ValidateProfileError.SERVER_ERROR]
    }

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending)
    ).toEqual({ isLoading: true, validateError: undefined })
  })

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      readOnly: false
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, '')
      )
    ).toEqual({
      isLoading: false,
      readOnly: true,
      validateError: undefined,
      form: data,
      data
    })
  })
})
