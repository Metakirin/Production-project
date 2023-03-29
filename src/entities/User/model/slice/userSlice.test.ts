import { UserSchema } from '../types/user'
import { userActions, userReducer } from './userSlice'

const user = {
  id: '1',
  username: 'Vik'
}

describe('profileSlice.test', () => {
  test('test set authData', () => {
    const state: DeepPartial<UserSchema> = {
      _inited: false
    }

    expect(
      userReducer(state as UserSchema, userActions.setAuthData(user))
    ).toEqual({ _inited: false, authData: user })
  })

  test('test init authData', () => {
    const state: DeepPartial<UserSchema> = {
      _inited: false
    }

    expect(
      userReducer(state as UserSchema, userActions.initAuthData())
    ).toEqual({ _inited: true })
  })

  test('test logout', () => {
    const state: DeepPartial<UserSchema> = {
      _inited: true,
      authData: user
    }

    expect(userReducer(state as UserSchema, userActions.logout())).toEqual({
      _inited: true,
      authData: undefined
    })
  })
})
