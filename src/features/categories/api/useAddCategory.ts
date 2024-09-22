import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICategory } from '@categories/interfaces/category.interface';
import useAxiosProtected from '@/features/authentication/api/useAxiosProtected';
import { AxiosInstance } from 'axios';

const addCategory = async (axiosProtected: AxiosInstance, category: ICategory) => {
  const { data } = await axiosProtected.post(`/api/categories`, category);
  return data;
};

export const useAddCategory = () => {
  const axiosProtected = useAxiosProtected();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (category: ICategory) => addCategory(axiosProtected, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'categories',
      });
    },
  });

  return mutation;
};
