import { useQuery } from '@tanstack/react-query';
import { ICategory } from '@categories/interfaces/category.interface';
import { AxiosInstance } from 'axios';
import useAxiosProtected from '@/features/authentication/api/useAxiosProtected';

const getCategories = async (axiosProtected: AxiosInstance): Promise<ICategory[]> => {
  const { data } = await axiosProtected.get(`/api/categories`);
  return data;
};

export const useGetCategories = () => {
  const axiosProtected = useAxiosProtected();

  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(axiosProtected),
  });

  return query;
};
