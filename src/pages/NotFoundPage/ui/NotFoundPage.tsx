import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotFoundPage.module.scss'
import { Page } from 'widgets/Page/Page'

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()

  return (
    <Page className={classNames(cls.notFoundPage, {}, [className])}>
      {t('Not found')}
    </Page>
  )
}
