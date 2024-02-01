// app/reports/[system]/page.tsx
'use client'

import { useSearchParams } from 'next/navigation';
import { getReportBySystem } from '@/utils/api-requests';
import { useQuery } from '@tanstack/react-query';

export default function ReportDetails() {
  const searchParams = useSearchParams()
  const system = searchParams.get('system')

  const { data: report } = useQuery({
    queryKey: ['report', system],
    queryFn: () => getReportBySystem(system!),
    enabled: !!system
  })

  if (!system) {
    return <div>No system specified</div>
  }

  if (!report) {
    return <div>Report not found</div>
  }

  return (
    <div>
      <h1>{report.system}</h1>

      <form>
        <label>
          FDDA1-01
          <input type='text' value={report.reports['FDDA1-01']} />
        </label>

        <label>
          FDDA1-04
          <input type='text' value={report.reports['FDDA1-04']} />
        </label>

        <label>
          FDDA1-05
          <input type='text' value={report.reports['FDDA1-05']} />
        </label>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
