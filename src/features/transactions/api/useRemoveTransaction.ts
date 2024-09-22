import useAxiosProtected from '@/features/authentication/api/useAxiosProtected';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITransaction } from '@transactions/interfaces/transaction.interface';
import { AxiosInstance } from 'axios';

const removeTransaction = async (transaction: ITransaction, axiosProtected: AxiosInstance) => {
  const { data } = await axiosProtected.delete(`/api/transaction-records/${transaction.id}`);
  return data;
};

export const useRemoveTransaction = () => {
  const queryClient = useQueryClient();
  const axiosProtected = useAxiosProtected();

  const mutation = useMutation({
    mutationFn: (transaction: ITransaction) => removeTransaction(transaction, axiosProtected),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'transaction-records'
      });
    },
  });

  return mutation;
};
