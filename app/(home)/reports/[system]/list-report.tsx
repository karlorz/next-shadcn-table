'use client'

import { useQuery } from '@tanstack/react-query'

import { getReportBySystem } from '@/utils/api-requests'

interface ListReportProps {
  system: string
}

import { columnstitles} from '@/constants/data'
import ReportDetail from '@/components/ReportDetail';

export default function ListReport({ system }: ListReportProps) {
  const {
    data: report,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['getReport', system],
    queryFn: () => getReportBySystem(system),
    staleTime: 10 * 1000
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  const showUndefined = false // Set this flag to control whether to show "n/a" values or not

  const sortedData =
    report &&
    (columnstitles
      .map(({ value, label }) => {
        const reportValue = report.reports[value]
        const displayValue = reportValue !== undefined ? reportValue : 'n/a' // Replace undefined values with 'n/a'

        if (!showUndefined && (displayValue === 'n/a' || displayValue === -1)) {
          return null; // Skip the item if showUndefined is false and the value is 'n/a' or -1
        }

        return [label, displayValue]
      })
      .filter(Boolean) as (string | number)[][])

  return (
    <div className='max-w-[300px]'>
      {report && (
        <>
          <h1>
            {system} / {report.month}
          </h1>
          <ReportDetail columns={['Label', 'Value']} data={sortedData || []} />
        </>
      )}
    </div>
  )
}
