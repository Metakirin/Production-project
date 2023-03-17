import React, { memo, useCallback } from 'react'
import { Currency } from '../../model/types/currency'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  readOnly?: boolean
  onChange?: (value: Currency) => void
}

export const CurrencySelect: React.FC<CurrencySelectProps> = memo((props) => {
  const { className, value, readOnly, onChange } = props
  const { t } = useTranslation()

  const options = useMemo(
    () => [
      { value: Currency.USD, content: Currency.USD },
      { value: Currency.EUR, content: Currency.EUR },
      { value: Currency.RUB, content: Currency.RUB }
    ],
    []
  )

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency)
    },
    [onChange]
  )

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('Currency')}
      options={options}
      value={value}
      readOnly={readOnly}
      onChange={onChangeHandler}
    />
  )
})
