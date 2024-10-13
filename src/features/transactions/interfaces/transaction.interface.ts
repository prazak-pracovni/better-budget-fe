import { ETransactionType } from "@/features/transactions/enums/transaction-type.enum";

export interface ITransaction {
    id: string;
    title: string;
    amount: number;
    type: ETransactionType;
    date: string;
    categoryId: string;
    description?: string;
}