import { BugButton } from 'app/providers/ErrorBoundary'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation('main')
  return <div>{t('Main Page', { ns: 'main' })}</div>
}

export default MainPage
