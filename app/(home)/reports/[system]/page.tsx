import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'

import { getReportBySystem, getSystems, Report } from '@/utils/api-requests'

import ListReport from './list-report'

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
  const system = params.system
  const queryClient = new QueryClient()
  const reportKey = 'getReport_'+system;

  await queryClient.prefetchQuery({
    queryKey: [reportKey, system],
    queryFn: () => getReportBySystem(system)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListReport system={system} />
    </HydrationBoundary>
  )
}
