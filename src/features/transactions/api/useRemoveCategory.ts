import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosProtected } from '@/api/axios';
import { ICategory } from '@transactions/interfaces/category.interface';

const removeCategory = async (category: ICategory) => {
  console.log('Removing category', category);
  const { data } = await axiosProtected.delete(`/api/categories/${category.id}`);
  return data;
};

export const useRemoveCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (category: ICategory) => removeCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'categories',
      });
    },
  });

  return mutation;
};
