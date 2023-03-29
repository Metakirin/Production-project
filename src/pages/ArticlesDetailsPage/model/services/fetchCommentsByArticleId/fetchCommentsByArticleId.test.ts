import { fetchCommentsByArticleId } from './fetchCommentsByArticleId'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

const comments = [
  {
    id: '1',
    user: { id: '1', username: 'Vik' },
    text: 'text1'
  },
  { id: '2', user: { id: '2', username: 'Klim' }, text: 'text2' }
]

describe('fetchCommentsByArticleId.test.test', () => {
  test('success fetching comments for article', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId)

    thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }))

    const result = await thunk.callThunk('1')

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(comments)
  })

  test('error fetching comments for article bcs of undefined param', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId)

    const result = await thunk.callThunk(undefined)

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('article undefined')
  })

  test('error fetching comments for article on server side', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId)
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk('1')

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
