import React from 'react'
import AboutIcon from 'shared/assets/icons/about.svg'
import MainIcon from 'shared/assets/icons/home.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Main Page',
    Icon: MainIcon
  },
  {
    path: RoutePath.about,
    text: 'About us',
    Icon: AboutIcon
  },
  {
    path: RoutePath.profile,
    text: 'Profile Page',
    Icon: ProfileIcon,
    authOnly: true
  }
]
