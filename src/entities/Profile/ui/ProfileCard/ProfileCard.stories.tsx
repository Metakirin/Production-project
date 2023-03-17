import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ProfileCard } from './ProfileCard'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  data: {
    first: 'Klim',
    lastname: 'Tsilha',
    age: 22,
    currency: Currency.USD,
    country: Country.USA,
    city: 'New York',
    username: 'admin',
    avatar:
      'https://i.pinimg.com/564x/fd/ee/49/fdee4934d6680ca4bac85dd0c15ca39a.jpg'
  }
}
Primary.decorators = []

export const withError = Template.bind({})
withError.args = {
  error: 'error'
}
withError.decorators = []

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true
}
Loading.decorators = []
