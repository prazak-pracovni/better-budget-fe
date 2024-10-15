import useAxiosProtected from '@/features/authentication/api/useAxiosProtected';
import { TOrder } from '@/types/order.type';
import { useQuery } from '@tanstack/react-query';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { AxiosInstance } from 'axios';

const getTransactions = async (axiosProtected: AxiosInstance, order: TOrder): Promise<ITransaction[]> => {
  const { data } = await axiosProtected.get(`/api/transaction-records`, {
    params: { order },
  });
  return data;
};

export const useGetTransactions = (order: TOrder = 'desc') => {
  const axiosProtected = useAxiosProtected();

  const query = useQuery({
    queryKey: ['transaction-records'],
    queryFn: () => getTransactions(axiosProtected, order),
  });

  return query;
};
