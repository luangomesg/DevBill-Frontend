import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ButtonIcon } from '../../components/button-icon'
import { Card } from '../../components/card'
import {
  CategoriesPieChart,
  CategoryProps,
} from '../../components/categories-pie-chart'
import { CreateCategoryDialog } from '../../components/create-category-dialog'
import { CreateTransactionDialog } from '../../components/create-transaction-dialog'
import { ErrorMessage } from '../../components/create-transaction-dialog/styles'
import { FinancialEvolutionBarChart } from '../../components/financial-evolution-bar-chart'
import { Input } from '../../components/input'
import { Logo } from '../../components/logo'
import { Title } from '../../components/title'
import { Transaction } from '../../components/transaction'
import { useFetchAPI } from '../../hooks/useFetchAPI'
import { transactionsFilterSchema } from '../../validators/schemas'
import { TransactionsFilterData } from '../../validators/types'
import {
  Header,
  Main,
  Section,
  Filters,
  InputGroup,
  Balance,
  ChartContainer,
  ChartContent,
  ChartAction,
  Aside,
  SearchTransaction,
  TransactionGroup,
} from './styles'

export function Home() {
  const transactionsFilterForm = useForm<TransactionsFilterData>({
    defaultValues: {
      title: '',
      categoryId: '',
      beginDate: dayjs().startOf('month').format('DD/MM/YYYY'),
      endDate: dayjs().endOf('month').format('DD/MM/YYYY'),
    },
    resolver: zodResolver(transactionsFilterSchema),
  })

  const { transactions, dashboard, fetchTransactions, fetchDashboard } =
    useFetchAPI()

  useEffect(() => {
    const { beginDate, endDate } = transactionsFilterForm.getValues()
    fetchDashboard({ beginDate, endDate })
    fetchTransactions(transactionsFilterForm.getValues())
  }, [fetchDashboard, fetchTransactions, transactionsFilterForm])

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null)

  const handleSelectCategory = useCallback(
    ({ id, title, color }: CategoryProps) => {
      setSelectedCategory({ id, title, color })
      transactionsFilterForm.setValue('categoryId', id)
    },
    [transactionsFilterForm],
  )

  const handleDeselectCategory = useCallback(() => {
    setSelectedCategory(null)
    transactionsFilterForm.setValue('categoryId', '')
  }, [transactionsFilterForm])

  const onSubmitTransactions = useCallback(
    async (data: TransactionsFilterData) => {
      await fetchTransactions(data)
    },
    [fetchTransactions],
  )

  const onSubmitDashboard = useCallback(
    async (data: TransactionsFilterData) => {
      const { beginDate, endDate } = data

      await fetchDashboard({ beginDate, endDate })
      await fetchTransactions(data)
    },
    [fetchTransactions, fetchDashboard],
  )
  return (
    <>
      <Header>
        <Logo />
        <div>
          <CreateTransactionDialog />
          <CreateCategoryDialog />
        </div>
      </Header>

      <Main>
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Receitas e despesas no período" />
            <InputGroup>
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Inicio"
                placeholder="dd/mm/aaaa"
                {...transactionsFilterForm.register('beginDate')}
              />
              <ErrorMessage>
                {transactionsFilterForm.formState.errors.beginDate?.message}
              </ErrorMessage>
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
                {...transactionsFilterForm.register('endDate')}
              />
              <ErrorMessage>
                {transactionsFilterForm.formState.errors.endDate?.message}
              </ErrorMessage>
              <ButtonIcon
                onClick={transactionsFilterForm.handleSubmit(onSubmitDashboard)}
              />
            </InputGroup>
          </Filters>

          <Balance>
            <Card title="Saldo" amount={dashboard?.balance?.balance || 0} />
            <Card
              title="Receitas"
              amount={dashboard?.balance?.incomes || 0}
              variant="incomes"
            />
            <Card
              title="Gastos"
              amount={dashboard?.balance?.expenses * -1 || 0}
              variant="expenses"
            />
          </Balance>

          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categoria no período"
              />
            </header>
            <ChartContent>
              <CategoriesPieChart onClick={handleSelectCategory} />
            </ChartContent>
          </ChartContainer>

          <ChartContainer>
            <header>
              <Title
                title="Evolução Finaceira"
                subtitle="Saldo, Receitas e Gastos no ano"
              />

              <ChartAction>
                <InputMask
                  component={Input}
                  mask="aaaa"
                  replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                  variant="black"
                  label="Ano"
                  placeholder="aaaa"
                />
                <ButtonIcon />
              </ChartAction>
            </header>
            <ChartContent>
              <FinancialEvolutionBarChart />
            </ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title title="Transações" subtitle="Receitas e Gastos no período" />
            <SearchTransaction>
              <Input
                variant="black"
                placeholder="Procurar transação..."
                {...transactionsFilterForm.register('title')}
              />
              <ButtonIcon
                onClick={transactionsFilterForm.handleSubmit(
                  onSubmitTransactions,
                )}
              />
            </SearchTransaction>
          </header>
          <TransactionGroup>
            {transactions?.length &&
              transactions?.map((item, index) => (
                <Transaction
                  key={item._id}
                  id={index + 1}
                  amount={
                    item.type == 'expense' ? item.amount * -1 : item.amount
                  }
                  date={dayjs(item.date).add(3, 'hours').format('DD/MM/YYYY')}
                  category={{
                    title: item.category.title,
                    color: item.category.color,
                  }}
                  title={item.title}
                  variant={item.type}
                />
              ))}
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  )
}
