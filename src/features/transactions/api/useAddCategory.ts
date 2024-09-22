import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosProtected } from '@/api/axios';
import { ICategory } from '@transactions/interfaces/category.interface';

const addCategory = async (category: ICategory) => {
  const { data } = await axiosProtected.post(`/api/categories`, category);
  return data;
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (category: ICategory) => addCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'categories',
      });
    },
  });

  return mutation;
};
