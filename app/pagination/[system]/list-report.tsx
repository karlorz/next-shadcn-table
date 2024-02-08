'use client'

import { useQuery } from '@tanstack/react-query'

import { getReportBySystem } from '@/utils/api-requests'

interface ListReportProps {
  system: string
}

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
    <div>
      {report && (
        <>
          <h1>
            {system} / {report.month}
          </h1>
          {Object.keys(report.reports).map(code => (
            <p key={code}>
              {code}: {report.reports[code]}
            </p>
          ))}
        </>
      )}
    </div>
  )
}
