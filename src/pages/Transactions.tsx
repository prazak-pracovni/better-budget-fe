import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosProtected from '../hooks/useAxiosProtected';

const Transactions: React.FC = () => {
  const axiosProtected = useAxiosProtected();

  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => axiosProtected.get('/api/transaction-records'),
  });

  return (
    <>
      <h1>Transactions</h1>
    </>
  );
};

export default Transactions;
