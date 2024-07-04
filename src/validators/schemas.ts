import { z } from 'zod'

export const transactionsFilterSchema = z.object({
  title: z.string().optional(),
  categoryId: z.string().optional(),
  beginDate: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01]\/0[0-9]|1[0-2]\/\d{4}$)/, {
      message: 'Data invalida',
    }),
  endDate: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01]\/0[0-9]|1[0-2]\/\d{4}$)/, {
      message: 'Data invalida',
    }),
})

export const createCategorySchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 caractere.' })
    .max(255),
  color: z
    .string()
    .regex(/^#[A-Fa-f0-9]{6}$/, { message: 'Deve seguir o padrão #rrggbb' }),
})

export const createTransactinSchema = z.object({
  categoryId: z
    .string()
    .regex(/^(?!null$)/g, { message: 'Escolha uma categoria' }),
  title: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 caractere' })
    .max(255, { message: 'Maximo de 255 caracteres' }),
  amount: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 digito' })
    .max(255, { message: 'Maximo de 255 digitos' }),
  date: z.string().regex(/^(0[1-9]|[12][0-9]|3[01]\/0[0-9]|1[0-2]\/\d{4}$)/, {
    message: 'Data invalida',
  }),
  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: 'Selecione um tipo valido' }),
  }),
})
