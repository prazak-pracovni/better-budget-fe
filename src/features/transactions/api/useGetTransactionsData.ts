import useAxiosProtected from '@/features/authentication/api/useAxiosProtected';
import { TOrder } from '@/types/order.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { ITransactionsFilter } from '@/features/transactions/interfaces/transactions-filter.interface';
import { ITransactionsData } from '@/features/transactions/interfaces/transaction-data.interface';

const getTransactionsData = async (
  axiosProtected: AxiosInstance,
  order: TOrder,
  filter?: ITransactionsFilter,
): Promise<ITransactionsData> => {
  const { data } = await axiosProtected.get(`/api/transaction-records`, {
    params: { order, ...filter },
  });
  return data;
};

export const useGetTransactionsData = (order: TOrder = 'DESC', filter?: ITransactionsFilter) => {
  const axiosProtected = useAxiosProtected();

  const query = useQuery({
    queryKey: ['transaction-records', order, filter],
    queryFn: () => getTransactionsData(axiosProtected, order, filter),
    placeholderData: keepPreviousData,
  });

  return query;
};
