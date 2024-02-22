import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'

import { getReportBySystem, getSystems, Report } from '@/utils/api-requests'

import ListReport from './list-report'

export async function generateStaticParams() {
  const systems = getSystems()
  return systems.map(system => ({
    system
  }))
}

// Page component
export default async function Page({ params }: { params: { system: string } }) {
  const { system } = params

  const queryClient = new QueryClient()

      await queryClient.prefetchQuery({
        queryKey: ['getReport', system],
        queryFn: () => getReportBySystem(system)
      })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListReport system={system} />
    </HydrationBoundary>
  )
}
