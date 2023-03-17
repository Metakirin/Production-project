import { StateSchema } from 'app/providers/StoreProvider'
import { getLoginState } from './getLoginState'

describe('getLoginState.test', () => {
  test('should return state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: '123',
        password: '123',
        isLoading: false,
        error: 'error'
      }
    }
    expect(getLoginState(state as StateSchema)).toEqual({
      username: '123',
      password: '123',
      isLoading: false,
      error: 'error'
    })
  })
})
