import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { className } = props
  const [t] = useTranslation()

  return (
    <div className={classNames(cls.loginForm, {}, [className])}>
      <Input
        autoFocus
        type='text'
        placeholder={t('Username')}
        className={cls.input}
      />
      <Input type='text' placeholder={t('Password')} className={cls.input} />
      <Button className={cls.loginBtn}>{t('Sign In')}</Button>
    </div>
  )
}
