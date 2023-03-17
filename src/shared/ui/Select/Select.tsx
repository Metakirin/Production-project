import { ChangeEvent, memo, useMemo } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  readOnly?: boolean
  onChange?: (value: string) => void
}

export const Select = memo((props: SelectProps) => {
  const { className, label, options, onChange, value, readOnly } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
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
