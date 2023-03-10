import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'shared/ui/Button/Button'
import { getCounterValue } from '../modal/selectors/getCounterValue/getCounterValue'
import { counterActions } from '../modal/slice/counterSlice'

export const Counter: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const counterValue = useSelector(getCounterValue)

  const increment = () => {
    dispatch(counterActions.increment())
  }
  const decrement = () => {
    dispatch(counterActions.decrement())
  }

  return (
    <div>
      <h1 data-testid='value-title'>{`${counterValue}`}</h1>
      <Button data-testid='increment-btn' onClick={increment}>
        {t('Incrememnt')}
      </Button>
      <Button data-testid='decrement-btn' onClick={decrement}>
        {t('Decrement')}
      </Button>
    </div>
  )
}
