import { useQuery } from '@tanstack/react-query';
import useAxiosProtected from '@/hooks/useAxiosProtected';

const Dashboard = () => {
  const axiosProtected = useAxiosProtected();

  const { data } = useQuery({
    queryKey: ['dahsboard'],
    queryFn: () => axiosProtected.get('/api/transaction-records'),
  });


  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
