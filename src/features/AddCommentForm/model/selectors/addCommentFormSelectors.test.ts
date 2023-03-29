import { StateSchema } from 'app/providers/StoreProvider'
import {
  getAddCommentFormError,
  getAddCommentFormText
} from './addCommentFormSelectors'

describe('getLoginError.test', () => {
  test('should return text', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: { text: '123' }
    }
    expect(getAddCommentFormText(state as StateSchema)).toEqual('123')
  })

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: { error: 'error' }
    }
    expect(getAddCommentFormError(state as StateSchema)).toEqual('error')
  })

  test('should work with empy state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getAddCommentFormText(state as StateSchema)).toEqual(undefined)
  })
})
