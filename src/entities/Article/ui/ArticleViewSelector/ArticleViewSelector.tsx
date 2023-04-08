import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleViewSelector.module.scss'
import { ArticleView } from '../../model/types/article'
import ListIcon from 'shared/assets/icons/listsSwitch.svg'
import TilesIcon from 'shared/assets/icons/cardsSwitch.svg'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  { view: ArticleView.SMALL, icon: TilesIcon },
  { view: ArticleView.BIG, icon: ListIcon }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props
  const { t } = useTranslation()

  const onClick = (view: ArticleView) => () => {
    onViewClick?.(view)
  }

  return (
    <div className={classNames('', {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          theme={ThemeButton.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames('', {
              [cls.notSelected]: viewType.view !== view
            })}
          />
        </Button>
      ))}
    </div>
  )
})
