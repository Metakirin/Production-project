import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { SidebarItemType } from '../types/sidebar'
import AboutIcon from 'shared/assets/icons/about.svg'
import MainIcon from 'shared/assets/icons/home.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import ArticleIcon from 'shared/assets/icons/article.svg'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      text: 'Main',
      Icon: MainIcon
    },
    {
      path: RoutePath.about,
      text: 'About us',
      Icon: AboutIcon
    }
  ]

  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData?.id,
        text: 'Profile',
        Icon: ProfileIcon,
        authOnly: true
      },
      {
        path: RoutePath.articles,
        text: 'Articles',
        Icon: ArticleIcon,
        authOnly: true
      }
    )
  }

  return sidebarItemsList
})
