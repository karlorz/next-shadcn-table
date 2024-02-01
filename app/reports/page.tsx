'use client'
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import Header from '@/components/Header';

const getReports = async () => {
  const response = await fetch('http://127.0.0.1:8080/reports');
  const data = await response.json();
  return data;
};

const ReportTable = () => {
  const { data, isLoading, isError } = useQuery('reports', getReports);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>Reports</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

const Page = () => {
  const queryClient = new QueryClient();

  return (
    
    <QueryClientProvider client={queryClient}>
      <ReportTable />
    </QueryClientProvider>
  );
};

export default Page;