import { useQuery } from '@tanstack/react-query';
import { axiosProtected } from '@/api/axios';
import { ICategory } from '@transactions/interfaces/category.interface';

const getCategories = async (): Promise<ICategory[]> => {
  const { data } = await axiosProtected.get(`/api/categories`);
  return data;
};

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  return query;
};
