import { getProfileData } from './../getProfileData/getProfileData'
import { StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { getUserAuthData } from 'entities/User'
import { getProfileCanEdit } from './getProfileCanEdit'

describe('getProfileCanEdit.test', () => {
  test('work with filled state and return true', () => {
    const data = {
      id: '1',
      first: 'Klim',
      lastname: 'Tsilha',
      age: 22,
      currency: Currency.USD,
      country: Country.USA,
      city: 'New York',
      username: 'admin'
    }

    const user = {
      id: '1',
      username: 'Vik'
    }

    const state: DeepPartial<StateSchema> = {
      profile: {
        data: data
      },
      user: { authData: user }
    }

    expect(getProfileCanEdit(state as StateSchema)).toEqual(true)
  })

  test('work with filled state and return false', () => {
    const data = {
      id: '1',
      first: 'Klim',
      lastname: 'Tsilha',
      age: 22,
      currency: Currency.USD,
      country: Country.USA,
      city: 'New York',
      username: 'admin'
    }

    const user = {
      id: '2',
      username: 'Vik'
    }

    const state: DeepPartial<StateSchema> = {
      profile: {
        data: data
      },
      user: { authData: user }
    }

    expect(getProfileCanEdit(state as StateSchema)).toEqual(false)
  })

  test('should work with empy state', () => {
    const state: DeepPartial<StateSchema> = { user: {} }
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
