import { addCommentForArticle } from './addCommentForArticle'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

const comment = {
  id: '1',
  user: { id: '1', username: 'Vik' },
  text: 'text'
}

const user = {
  id: '1',
  username: 'Vik'
}

const articleDetailsData = {
  id: '1',
  title: 'text',
  subtitle: 'sub text'
}

describe('addCommentForArticle.test', () => {
  test('success adding comment for article', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      user: { authData: user },
      articleDetails: { data: articleDetailsData }
    })
    thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }))

    const result = await thunk.callThunk('text')

    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(comment)
  })

  test('error adding comment for article bcs of data leck', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, { user: {} })

    const result = await thunk.callThunk('text')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('no data')
  })

  test('error adding comment for article on server side', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      user: { authData: user },
      articleDetails: { data: articleDetailsData }
    })
    thunk.api.post.mockRejectedValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk('text')

    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
