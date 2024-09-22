import { useGetCategories } from '@/features/transactions/api/useGetCategories';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const { data: categories } = useGetCategories();

  return (
    <div className="flex flex-col gap-2">
      {categories?.map((category) => <CategoryItem key={category.id} category={category}></CategoryItem>)}
    </div>
  );
};

export default CategoryList;
