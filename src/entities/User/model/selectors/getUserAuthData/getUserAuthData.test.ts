import { StateSchema } from 'app/providers/StoreProvider'
import { getUserAuthData } from './getUserAuthData'

describe('getUserAuthData.test', () => {
  test('work with filled state', () => {
    const user = {
      id: '1',
      username: 'Vik'
    }

    const state: DeepPartial<StateSchema> = {
      user: { authData: user }
    }

    expect(getUserAuthData(state as StateSchema)).toEqual(user)
  })

  test('should work with empy state', () => {
    const state: DeepPartial<StateSchema> = { user: {} }
    expect(getUserAuthData(state as StateSchema)).toEqual(undefined)
  })
})
