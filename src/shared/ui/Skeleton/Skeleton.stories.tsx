import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Skeleton } from './Skeleton'

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
  width: '100%',
  height: 200
}

export const Circle = Template.bind({})
Circle.args = {
  border: '50%',
  width: 100,
  height: 100
}

export const Dark = Template.bind({})
Dark.args = {
  width: '100%',
  height: 200
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const DarkCircle = Template.bind({})
DarkCircle.args = {
  border: '50%',
  width: 100,
  height: 100
}
DarkCircle.decorators = [ThemeDecorator(Theme.DARK)]

export const Sakura = Template.bind({})
Sakura.args = {
  width: '100%',
  height: 200
}
Sakura.decorators = [ThemeDecorator(Theme.SAKURA)]

export const SakuraCircle = Template.bind({})
SakuraCircle.args = {
  border: '50%',
  width: 100,
  height: 100
}
SakuraCircle.decorators = [ThemeDecorator(Theme.SAKURA)]
