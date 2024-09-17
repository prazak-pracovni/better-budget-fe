import { ETrancactionType } from "@transactions/enums/transaction-type.interface";

export interface ITransaction {
    id: string;
    amount: number;
    type: ETrancactionType;
    title: string;
    date: string;
    categoryId?: string;
    description?: string;
}