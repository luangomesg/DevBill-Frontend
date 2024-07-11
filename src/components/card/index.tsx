import {
  ArrowCircleDownRight,
  ArrowCircleUpRight,
  CurrencyCircleDollar,
} from '@phosphor-icons/react'

import { formatCurrency } from '../../utils/format-currency'
import { Container } from './styles'

type CardProps = {
  variant?: 'balance' | 'revenues' | 'outgoing'
  title: string
  amount: number
}

const icons = {
  balance: <CurrencyCircleDollar />,
  revenues: <ArrowCircleUpRight />,
  outgoing: <ArrowCircleDownRight />,
}

export function Card({ variant = 'balance', title, amount }: CardProps) {
  return (
    <Container $variant={variant}>
      {icons[variant]}
      <span>{title}</span>
      <strong>{formatCurrency(amount)}</strong>
    </Container>
  )
}
