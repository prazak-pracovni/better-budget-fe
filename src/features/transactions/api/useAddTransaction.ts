import useAxiosProtected from '@/features/authentication/api/useAxiosProtected';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { AxiosInstance } from 'axios';

const addTransaction = async (transaction: ITransaction, axiosProtected: AxiosInstance) => {
  const { data } = await axiosProtected.post(`/api/transaction-records`, transaction);
  return data;
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const axiosProtected = useAxiosProtected();

  const mutation = useMutation({
    mutationFn: (transaction: ITransaction) => addTransaction(transaction, axiosProtected),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'transaction-records',
      });
    },
  });

  return mutation;
};
