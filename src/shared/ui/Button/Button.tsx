import React, { ButtonHTMLAttributes } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    theme,
    children,
    square,
    size = ButtonSize.M,
    disabled,
    ...otherProps
  } = props

  const mods: Record<string, boolean> = {
    [cls.square]: square,
    [cls.disabled]: disabled
  }

  return (
    <button
      type='button'
      className={classNames(cls.button, mods, [
        className,
        cls[theme],
        cls[size]
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
}
