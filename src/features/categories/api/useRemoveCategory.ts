import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICategory } from '@categories/interfaces/category.interface';
import { AxiosInstance } from 'axios';
import useAxiosProtected from '@/features/authentication/api/useAxiosProtected';

const removeCategory = async (category: ICategory, axiosProtected: AxiosInstance) => {
  const { data } = await axiosProtected.delete(`/api/categories/${category.id}`);
  return data;
};

export const useRemoveCategory = () => {
  const queryClient = useQueryClient();
  const axiosProtected = useAxiosProtected();

  const mutation = useMutation({
    mutationFn: (category: ICategory) => removeCategory(category, axiosProtected),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'categories',
      });
    },
  });

  return mutation;
};
