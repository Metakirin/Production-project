import { Story } from '@storybook/react/dist/ts3.9/client/preview/types-6-0'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice'
import { profileReducer } from 'entities/Profile'
import { addCommentFormReducer } from 'features/AddCommentForm/model/slice/addCommentFormSlice'
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice'
import { ScrollSaveReducer } from 'features/ScrollSave'
import { articleDetailsPageReducer } from 'pages/ArticlesDetailsPage/model/slice'
import { articleDetailsCommentsReducer } from 'pages/ArticlesDetailsPage/model/slice/articleDetailsCommentsSlice'
import { articlesPageReducer } from 'pages/ArticlesPage/model/slice/articlesPageSlice'
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
  scrollSave: ScrollSaveReducer,
  articlesPage: articlesPageReducer
}

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (StoryComponent: Story) =>
      (
        <StoreProvider
          initialState={state as StateSchema}
          asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
          <StoryComponent />
        </StoreProvider>
      )
