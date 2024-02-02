// app/reports/[system]/page.tsx
'use client'

import { getReportBySystem } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export default function ReportDetails({
  params
}: {
  params: { system: string }
}) {
  const { data: report } = useQuery({
    queryKey: ['report', params.system],
    queryFn: () => getReportBySystem(params.system!),
    enabled: !!params.system
  })

  if (!params.system) {
    return <div>No system specified</div>
  }

  if (!report) {
    return <div>Report not found</div>
  }

  return (
    <div>
      <h1>{report.system}</h1>

      <div>
        {Object.keys(report.reports).map(code => (
          <p key={code}>
            {code}: {report.reports[code]}
          </p>
        ))}
      </div>
    </div>
  )
}
