import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';
import { ICategory } from '@transactions/interfaces/category.interface';

const addTransaction = async (category: ICategory) => {
  const { data } = await axios.post(`/api/category`, category);
  return data;
};

export const useAddTransaction = () => {
  const mutation = useMutation({
    mutationFn: (category: ICategory) => addTransaction(category),
    onSuccess: (data) => {
      console.log('Cateogry added successfully', data);
    },
  });

  return mutation;
};
