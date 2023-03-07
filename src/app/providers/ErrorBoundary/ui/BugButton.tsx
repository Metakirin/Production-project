import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'

// Component for testing Error Boundary
export const BugButton: React.FC = () => {
  const [error, setError] = useState(false)
  const { t } = useTranslation()
  const onThrow = () => setError(true)

  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])

  return <Button onClick={onThrow}>{t('Throw error')}</Button>
}
