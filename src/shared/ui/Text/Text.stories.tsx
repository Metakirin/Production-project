import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Text, TextSize, TextTheme } from './Text'

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: 'Title',
  text: 'text'
}

export const SizeL = Template.bind({})
SizeL.args = {
  title: 'Title',
  text: 'text',
  size: TextSize.L
}

export const Error = Template.bind({})
Error.args = {
  title: 'Title',
  text: 'text',
  theme: TextTheme.Error
}

export const onlyTitle = Template.bind({})
onlyTitle.args = {
  title: 'Title'
}

export const onlyText = Template.bind({})
onlyText.args = {
  text: 'text'
}

export const Dark = Template.bind({})
Dark.args = {
  title: 'Title',
  text: 'text'
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTitleDark = Template.bind({})
onlyTitleDark.args = {
  title: 'Title'
}
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTextDark = Template.bind({})
onlyTextDark.args = {
  text: 'text'
}
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const ErrorDark = Template.bind({})
ErrorDark.args = {
  title: 'Title',
  text: 'text',
  theme: TextTheme.Error
}
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)]
