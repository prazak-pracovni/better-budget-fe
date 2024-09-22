import { ETransactionType } from '@transactions/enums/transaction-type.enum'

export const TRANSACTION_TYPES: Record<ETransactionType, { label: string; value: ETransactionType }> = {
  [ETransactionType.EXPENSE]: { label: 'Expense', value: ETransactionType.EXPENSE },
  [ETransactionType.INCOME]: { label: 'Income', value: ETransactionType.INCOME },
};
