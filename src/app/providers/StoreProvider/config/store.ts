import {
  Action,
  CombinedState,
  configureStore,
  Dispatch,
  isAnyOf,
  isFulfilled,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from './StateSchema'
import { counterReducer } from 'entities/Counter'
import { userActions, userReducer } from 'entities/User'
import { loginByUsername } from 'features/AuthByUserName/model/services/loginByUsername/loginByUsername'
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage'
import { createReducerManager } from './reducerManager'
import { $api } from 'shared/api/api'
import { ScrollSaveReducer } from 'features/ScrollSave'

interface Store {
  dispatch: Dispatch
  getState: () => StateSchema
}

const isLoggedIn = isFulfilled(loginByUsername)
const isLoggedOut = isAnyOf(userActions.logout)

const authMiddleware =
  (store: Store) =>
    (next: (action: Action) => void) =>
      (action: Action): void => {
        if (isLoggedIn(action)) {
          localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(action.payload)
          )
        }

        if (isLoggedOut(action)) {
          localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        }

        next(action)
      }

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    scrollSave: ScrollSaveReducer
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: extraArg }
      }).concat(authMiddleware)
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
