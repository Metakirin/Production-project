import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPageHeader.module.scss'
import { Button } from 'shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useSelector } from 'react-redux'
import { getArticleCanEdit } from 'pages/ArticlesDetailsPage/model/selectors/article'
import { getArticleDetailsData } from 'entities/Article'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props
    const { t } = useTranslation()
    const navigate = useNavigate()
    const canEdit = useSelector(getArticleCanEdit)
    const article = useSelector(getArticleDetailsData)

    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}${article?.id}/edit`)
    }, [navigate, article?.id])

    return (
      <div
        className={classNames(cls.articleDetailsPageHeader, {}, [className])}
      >
        <Button onClick={onBackToList}>
          {t('Back', { ns: 'translation' })}
        </Button>
        {canEdit && (
          <Button onClick={onEditArticle} className={cls.editBtn}>
            {t('Edit', { ns: 'translation' })}
          </Button>
        )}
      </div>
    )
  }
)
