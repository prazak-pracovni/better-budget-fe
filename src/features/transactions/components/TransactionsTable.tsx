import { ICategory } from '@/features/categories/interfaces/category.interface';
import TransactionTableRow from '@transactions/components/TransactionTableRow';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { HEADER_CELLS } from '@transactions/constants/header-cells';
import FlexTableHeaderCell from '@/components/ui/table/header/FlexTableHeaderCell';
import FlexTableBody from '@/components/ui/table/body/FlexTableBody';
import FlexTable from '@/components/ui/table/FlexTable';
import FlexTableHeaderRow from '@/components/ui/table/header/FlexTablHeaderRow';
import NoData from '@/components/ui/NoData';

interface Props {
  categories: ICategory[];
  transactions: ITransaction[];
  openModal: (transaction: ITransaction) => void;
}

const TransactionsTable: React.FC<Props> = ({ transactions, categories, openModal }) => {
  return (
    <FlexTable>
      <FlexTableHeaderRow>
        {HEADER_CELLS.map((cell, index) => (
          <FlexTableHeaderCell key={cell} className={`${index === HEADER_CELLS.length - 1 ? 'justify-end' : ''}`}>
            {cell}
          </FlexTableHeaderCell>
        ))}
      </FlexTableHeaderRow>
      <FlexTableBody>
        {transactions.length ? (
          transactions.map((transaction) => (
            <TransactionTableRow
              key={transaction.id}
              transaction={transaction}
              categories={categories}
              openModal={openModal}
            ></TransactionTableRow>
          ))
        ) : (
          <NoData>
            <p className="text-center text-gray-700">
              There are no transactions yet. You can create new transaction by clicking on Add transaction button.
            </p>
          </NoData>
        )}
      </FlexTableBody>
    </FlexTable>
  );
};

export default TransactionsTable;
