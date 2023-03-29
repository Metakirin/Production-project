import { Comment } from 'entities/Comment'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { ArticleDetailsCommentSchema } from '../types/articleDetailsCommentSchema'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'

const comments: Comment[] = [
  {
    id: '1',
    user: { id: '1', username: 'Vik' },
    text: 'text1'
  },
  { id: '2', user: { id: '2', username: 'Klim' }, text: 'text2' }
]

describe('articleDetailsCommentsSlice.test', () => {
  test('test fetchCommentsByArticleId service pending', () => {
    const state: DeepPartial<ArticleDetailsCommentSchema> = {
      isLoading: false
    }

    expect(
      articleDetailsCommentsReducer(
        state as ArticleDetailsCommentSchema,
        fetchCommentsByArticleId.pending
      )
    ).toEqual({ isLoading: true })
  })

  test('test fetchCommentsByArticleId service fullfield', () => {
    const state: DeepPartial<ArticleDetailsCommentSchema> = {
      ids: [],
      entities: {},
      isLoading: true
    }

    expect(
      articleDetailsCommentsReducer(
        state as ArticleDetailsCommentSchema,
        fetchCommentsByArticleId.fulfilled(comments, '', undefined)
      )
    ).toEqual({
      isLoading: false,
      ids: ['1', '2'],
      entities: {
        '1': {
          id: '1',
          text: 'text1',
          user: {
            id: '1',
            username: 'Vik'
          }
        },
        '2': {
          id: '2',
          text: 'text2',
          user: {
            id: '2',
            username: 'Klim'
          }
        }
      }
    })
  })
})
