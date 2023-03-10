import React, {
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  autofocus?: boolean
}

export const Input: React.FC<InputProps> = memo((props) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    ...otherProps
  } = props

  const ref = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [caretPosition, setCaretPosition] = useState(0)

  const inputCaretValue = (caretPosition: number): string =>
    Array(caretPosition).fill(' ').join('').concat('_')

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
    setCaretPosition(e.target.value.length)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  const onFocus = () => {
    setIsFocused(true)
  }

  const onSelect = (event: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (event?.target instanceof HTMLInputElement) {
      setCaretPosition(event?.target?.selectionStart || 0)
    }
  }

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true)
      ref.current?.focus()
    }
  }, [autofocus])

  return (
    <div className={classNames(cls.inputWrapper, {}, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          {...otherProps}
        />
        {isFocused && (
          <input
            className={cls.caretInput}
            value={inputCaretValue(caretPosition)}
            readOnly
            tabIndex={-1}
          />
        )}
      </div>
    </div>
  )
})
