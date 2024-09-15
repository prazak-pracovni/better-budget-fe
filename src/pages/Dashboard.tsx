import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosProtected from '../hooks/useAxiosProtected';

const Dashboard: React.FC = () => {
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
