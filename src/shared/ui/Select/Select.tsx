import { ChangeEvent, memo, useMemo } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import { typedMemo } from 'shared/types'

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: SelectOption<T>[]
  value?: T
  readOnly?: boolean
  onChange?: (value: T) => void
}

export const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
  const { className, label, options, onChange, value, readOnly } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T)
  }

  const optionList = useMemo(() => {
    return options?.map((opt) => (
      <option className={cls.option} value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    ))
  }, [options])

  const mods: Mods = {
    [cls.readOnly]: readOnly
  }

  return (
    <div className={classNames(cls.wrapper, mods, [className])}>
      {label && <span className={cls.label}>{label + '>'}</span>}
      <select
        className={cls.select}
        name=''
        id=''
        value={value}
        disabled={readOnly}
        onChange={onChangeHandler}
      >
        {optionList}
      </select>
    </div>
  )
})
