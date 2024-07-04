import { z } from 'zod'

import {
  createCategorySchema,
  createTransactinSchema,
  transactionsFilterSchema,
} from './schemas'

export type CreateCategoryData = z.infer<typeof createCategorySchema>

export type CreateTransactionData = z.infer<typeof createTransactinSchema>

export type TransactionsFilterData = z.infer<typeof transactionsFilterSchema>
