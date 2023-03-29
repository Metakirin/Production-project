import { updateProfileData } from './updateProfileData'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { ValidateProfileError } from '../../types/profile'

const data = {
  first: 'Klim',
  lastname: 'Tsilha',
  age: 22,
  currency: Currency.USD,
  country: Country.USA,
  city: 'New York',
  username: 'admin',
  id: '1'
}

describe('updateProfileData.test', () => {
  test('success updating data', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data }
    })
    thunk.api.put.mockReturnValue(Promise.resolve({ data: data }))

    const result = await thunk.callThunk()

    expect(thunk.api.put).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })

  test('error updating data on server side', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data }
    })
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
  })

  test('should return array of validate errors', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: { ...data, lastname: '' } }
    })

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
  })
})
