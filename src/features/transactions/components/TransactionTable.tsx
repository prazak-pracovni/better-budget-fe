import { useGetTransactions } from '@transactions/api/useGetTransactions';
import { ICategory } from '@/features/categories/interfaces/category.interface';
import Loading from '@/components/ui/Loading';
import TransactionTableRow from '@transactions/components/TransactionTableRow';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { HEADER_CELLS } from '@transactions/constants/header-cells';
import FlexTableHeader from '@/components/ui/table/header/FlexTableHeader';
import FlexTableHeaderCell from '@/components/ui/table/header/FlexTableHeaderCell';
import FlexTableBody from '@/components/ui/table/body/FlexTableBody';
import FlexTable from '@/components/ui/table/FlexTable';
import FlexTableHeaderRow from '@/components/ui/table/header/FlexTablHeaderRow';

interface Props {
  categories: ICategory[] | undefined;
  openModal: (transaction: ITransaction) => void;
}

const TransactionTable: React.FC<Props> = ({ categories, openModal }) => {
  const { data: transactions, isLoading } = useGetTransactions();

  if (isLoading) {
    return <Loading isLoading={isLoading}></Loading>;
  }

  return (
    <FlexTable>
      <FlexTableHeader>
        <FlexTableHeaderRow>
          {HEADER_CELLS.map((cell, index) => (
            <FlexTableHeaderCell key={cell} className={`${index === HEADER_CELLS.length - 1 ? 'justify-end' : ''}`}>
              {cell}
            </FlexTableHeaderCell>
          ))}
        </FlexTableHeaderRow>
      </FlexTableHeader>
      <FlexTableBody>
        {transactions?.map((transaction) => (
          <TransactionTableRow
            key={transaction.id}
            transaction={transaction}
            categories={categories}
            openModal={openModal}
          ></TransactionTableRow>
        ))}
      </FlexTableBody>
    </FlexTable>
  );
};

export default TransactionTable;
