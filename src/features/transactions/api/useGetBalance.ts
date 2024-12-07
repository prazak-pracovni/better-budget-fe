import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import useAxiosProtected from '@/features/authentication/api/useAxiosProtected';

const getBalance = async (axiosProtected: AxiosInstance, date?: string): Promise<number> => {
  const { data } = await axiosProtected.get(`/api/transaction-records/balance`, { params: { date } });
  return data;
};

export const useGetBalance = (date?: string) => {
  const axiosProtected = useAxiosProtected();

  const query = useQuery({
    queryKey: ['balance', date],
    queryFn: () => getBalance(axiosProtected, date),
  });

  return query;
};
