import { StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { getprofileForm } from './getprofileForm'

describe('getprofileForm.test', () => {
  test('work with filled state', () => {
    const form = {
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
        form: form
      }
    }

    expect(getprofileForm(state as StateSchema)).toEqual(form)
  })

  test('should work with empy state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getprofileForm(state as StateSchema)).toEqual(undefined)
  })
})
