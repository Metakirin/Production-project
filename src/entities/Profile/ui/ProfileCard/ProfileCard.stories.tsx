import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { ProfileCard } from './ProfileCard'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import AvatarImg from 'shared/assets/tests/angel.jpg'
import { url } from 'inspector'

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
    avatar: AvatarImg
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
