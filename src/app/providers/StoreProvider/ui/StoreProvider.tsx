import React from 'react'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { StateSchema } from '../config/StateSchema'
import { createReduxStore } from '../config/store'
import { useNavigate } from 'react-router-dom'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: StateSchema
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
  const { children, initialState, asyncReducers } = props
  const navigate = useNavigate()

  const store = createReduxStore(
    initialState,
    asyncReducers as ReducersMapObject<StateSchema>,
    navigate
  )

  return <Provider store={store}>{children}</Provider>
}
