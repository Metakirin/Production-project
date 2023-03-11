import { DeepPartial } from '@reduxjs/toolkit'
import { Story } from '@storybook/react/dist/ts3.9/client/preview/types-6-0'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'

export const StoreDecorator =
  (state: DeepPartial<StateSchema>) => (StoryComponent: Story) =>
    (
      <StoreProvider initialState={state as StateSchema}>
        <StoryComponent />
      </StoreProvider>
    )
