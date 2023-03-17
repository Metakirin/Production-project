import React from 'react'
import { useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { className, src, size, alt } = props

  const styles = useMemo<React.CSSProperties>(
    () => ({ with: size || 100, height: size || 100 }),
    [size]
  )

  return (
    <img
      src={src}
      alt={alt}
      className={classNames(cls.avatar, {}, [className])}
      style={styles}
    />
  )
}
