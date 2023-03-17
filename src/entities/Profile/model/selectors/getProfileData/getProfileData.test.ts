import { StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { getProfileData } from './getProfileData'

describe('getProfileData.test', () => {
  test('work with filled state', () => {
    const data = {
      first: 'Klim',
      lastname: 'Tsilha',
      age: 22,
      currency: Currency.USD,
      country: Country.USA,
      city: 'New York',
      username: 'admin'
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: data
      }
    }

    expect(getProfileData(state as StateSchema)).toEqual(data)
  })

  test('should work with empy state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
