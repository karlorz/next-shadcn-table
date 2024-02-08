'use client'

import { getReports } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import React from 'react'

export default function ListReports() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reports'],
    queryFn: () => getReports(),
    staleTime: 10 * 1000
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  return (
    <div>
      <h1>Reports</h1>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  )
}
