import { getReportBySystem, getSystems, Report } from '@/utils/api-requests'

const systems = getSystems()

export async function generateStaticParams() {
  return systems.map(system => ({
    system
  }))
}

interface PageReport extends Omit<Report, 'reports'> {
  reports: {
    [key: string]: number
    // other keys
  }
}

export default async function Page({ params }: { params: { system: string } }) {
  const report = (await getReportBySystem(params.system)) as PageReport
  const { system, month } = report;
  const reports = report.reports as PageReport['reports']

  return (
    <>
      <h1>{system} / {month}</h1> 
      {Object.keys(reports).map(code => (
        <p key={code}>
          {code}: {reports[code]}
        </p>
      ))}
    </>
  )
}
