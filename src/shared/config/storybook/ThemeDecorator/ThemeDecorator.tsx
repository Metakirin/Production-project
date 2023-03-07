import { Story } from '@storybook/react/dist/ts3.9/client/preview/types-6-0'
import { Theme } from 'app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
  (
    <div className={`app ${theme}`}>
      <StoryComponent />
    </div>
  )
