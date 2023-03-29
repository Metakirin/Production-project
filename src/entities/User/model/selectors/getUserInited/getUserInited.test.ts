import { StateSchema } from 'app/providers/StoreProvider'
import { getUserInited } from './getUserInited'

describe('getUserInited.test', () => {
  test('work with filled state', () => {
    const state: DeepPartial<StateSchema> = {
      user: { _inited: true }
    }

    expect(getUserInited(state as StateSchema)).toEqual(true)
  })

  test('should work with empy state', () => {
    const state: DeepPartial<StateSchema> = { user: {} }
    expect(getUserInited(state as StateSchema)).toEqual(false)
  })
})
