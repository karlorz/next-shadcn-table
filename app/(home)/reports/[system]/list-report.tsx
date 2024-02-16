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

  return (
    <div className="max-w-[300px]">
      {report && (
        <>
          <h1>
            {system} / {report.month}
          </h1>
          <ReportDetail
            columns={['Label', 'Value']}
            data={Object.entries(report.reports).map(([key, value]) => [
              columnstitles.find(label => label.value === key)?.label || key,
              value
            ])}
          />
        </>
      )}
    </div>
  )
}
