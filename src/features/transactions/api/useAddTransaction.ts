import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';
import { ITransaction } from '@transactions/interfaces/transaction.interface';


const addTransaction = async (transaction: ITransaction) => {
  const { data } = await axios.post(`/api/transaction-records`, transaction);
  return data;
};

export const useAddTransaction = () => {
  const mutation = useMutation({
    mutationFn: (transaction: ITransaction) => addTransaction(transaction),
  });

  return mutation;
};
