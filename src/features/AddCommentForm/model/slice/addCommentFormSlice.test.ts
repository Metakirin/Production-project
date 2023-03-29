import { AddCommentFormSchema } from '../types/AddCommentForm'
import {
  addCommentFormActions,
  addCommentFormReducer
} from './addCommentFormSlice'

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<AddCommentFormSchema> = {}

    expect(
      addCommentFormReducer(
        state as AddCommentFormSchema,
        addCommentFormActions.setText('123123')
      )
    ).toEqual({ text: '123123' })
  })
})
