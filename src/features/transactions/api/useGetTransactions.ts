import { useQuery } from '@tanstack/react-query';
import { axiosProtected } from '@/api/axios';
import { ITransaction } from '@transactions/interfaces/transaction.interface';

const getTransactions = async (): Promise<ITransaction[]> => {
  const { data } = await axiosProtected.get(`/api/transaction-records`);
  return data;
};

export const useGetTransactions = () => {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions(),
  });

  return query;
};
