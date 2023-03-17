import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Select } from './Select'

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  args: {
    to: '/'
  }
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Enter smthg',
  options: [
    { value: '123', content: 'first' },
    { value: '124', content: 'second' },
    { value: '125', content: 'third' }
  ]
}

export const Dark = Template.bind({})
Dark.args = {
  label: 'Enter smthg',
  options: [
    { value: '123', content: 'first' },
    { value: '124', content: 'second' },
    { value: '125', content: 'third' }
  ]
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
