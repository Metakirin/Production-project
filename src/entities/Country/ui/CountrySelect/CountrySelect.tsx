import { memo, useCallback } from 'react'
import { Country } from '../../model/types/country'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

interface CountrySelectProps {
  className?: string
  value?: Country
  readOnly?: boolean
  onChange?: (value: Country) => void
}

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, readOnly, onChange } = props
  const { t } = useTranslation('profile')

  const options = useMemo(
    () => [
      { value: Country.USA, content: Country.USA },
      { value: Country.Poland, content: Country.Poland },
      { value: Country.Russia, content: Country.Russia },
      { value: Country.Belarus, content: Country.Belarus },
      { value: Country.Ukraine, content: Country.Ukraine }
    ],
    []
  )

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country)
    },
    [onChange]
  )

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('Country', { ns: 'profile' })}
      options={options}
      value={value}
      readOnly={readOnly}
      onChange={onChangeHandler}
    />
  )
})
