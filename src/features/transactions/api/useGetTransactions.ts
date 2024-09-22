import useAxiosProtected from '@/features/authentication/api/useAxiosProtected';
import { useQuery } from '@tanstack/react-query';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { AxiosInstance } from 'axios';

const getTransactions = async (axiosProtected: AxiosInstance): Promise<ITransaction[]> => {
  const { data } = await axiosProtected.get(`/api/transaction-records`);
  return data;
};

export const useGetTransactions = () => {
  const axiosProtected = useAxiosProtected();

  const query = useQuery({
    queryKey: ['transaction-records'],
    queryFn: () => getTransactions(axiosProtected),
  });

  return query;
};
