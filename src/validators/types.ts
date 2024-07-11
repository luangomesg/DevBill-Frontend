import { z } from 'zod'

import {
  createCategorySchema,
  createTransactionSchmea,
  financialEvolutionFilterSchema,
  transactionsFilterSchema,
} from './schemas'

export type CreateCategoryData = z.infer<typeof createCategorySchema>

export type CreateTransactionData = z.infer<typeof createTransactionSchmea>

export type TransactionFilterData = z.infer<typeof transactionsFilterSchema>

export type FinancialEvolutionFilterData = z.infer<
  typeof financialEvolutionFilterSchema
>
