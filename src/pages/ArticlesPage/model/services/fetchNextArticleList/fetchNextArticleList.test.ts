import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { fetchNextArticleList } from './fetchNextArticleList'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

jest.mock('../fetchArticlesList/fetchArticlesList')

describe('fetchNextArticleList.test', () => {
  test('success fetching data', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticleList, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticlesList).toBeCalledWith({ page: 3 })
  })

  test('fetchNextArticleList not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticleList, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalled()
  })

  test('fetchNextArticleList not called bcs of loading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticleList, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalled()
  })
})
