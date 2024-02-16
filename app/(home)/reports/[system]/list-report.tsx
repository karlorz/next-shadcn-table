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

  const sortedData = report && columnstitles.map(({ value, label }) => {
    const reportValue = report.reports[value];
    const displayValue = reportValue !== undefined ? reportValue : label;
    return [label, displayValue];
  });

  return (
    <div className="max-w-[300px]">
      {report && (
        <>
          <h1>
            {system} / {report.month}
          </h1>
          <ReportDetail
            columns={['Label', 'Value']}
            data={sortedData || []}
          />
        </>
      )}
    </div>
  );
}