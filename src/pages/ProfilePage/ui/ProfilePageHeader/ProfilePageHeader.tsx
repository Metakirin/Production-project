import {
  getProfileData,
  getProfileReadOnly,
  profileActions,
  updateProfileData
} from 'entities/Profile'
import { getProfileCanEdit } from 'entities/Profile/model/selectors/getProfileCanEdit/getProfileCanEdit'
import { getUserAuthData } from 'entities/User'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import cls from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = (props) => {
  const { className } = props
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()

  const readOnly = useSelector(getProfileReadOnly)
  const canEdit = useSelector(getProfileCanEdit)

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <div className={classNames(cls.profilePageHeader, {}, [className])}>
      <Text title={t('Profile', { ns: 'profile' })} />
      {canEdit && (
        <div className={cls.btnsWrapper}>
          {readOnly ? (
            <Button
              theme={ThemeButton.OUTLINE}
              className={cls.editBtn}
              onClick={onEdit}
            >
              {t('Edit', { ns: 'profile' })}
            </Button>
          ) : (
            <>
              <Button
                theme={ThemeButton.OUTLINE_RED}
                className={cls.editBtn}
                onClick={onCancelEdit}
              >
                {t('Cancel', { ns: 'profile' })}
              </Button>
              <Button
                theme={ThemeButton.OUTLINE}
                className={cls.saveBtn}
                onClick={onSave}
              >
                {t('Save', { ns: 'profile' })}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
