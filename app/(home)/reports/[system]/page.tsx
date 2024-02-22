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

// Server-side props
async function getReports() {
  const queryClient = new QueryClient()

  // Prefetch systems data
  // await queryClient.prefetchQuery({
  //   queryKey: ['systems'],
  //   queryFn: () => getSystems()
  // })

  // If system data is available, prefetch Report data
  const systems = await getSystems()
  if (systems) {
    systems.forEach(async system => {
      await queryClient.prefetchQuery({
        queryKey: ['getReport'+system, system],
        queryFn: () => getReportBySystem(system)
      })
    })
  }
  const dehydratedState = dehydrate(queryClient)

  return dehydratedState
}

// Page component
export default async function Page({ params }: { params: { system: string } }) {
  const { system } = params
  // const dehydratedState = await getReports()
  const queryClient = new QueryClient()
  // if (systems) {
  //   systems.forEach(async system => {
      await queryClient.prefetchQuery({
        queryKey: ['getReport', system],
        queryFn: () => getReportBySystem(system)
      })
  //   })
  // }
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <ListReport system={system} />
    </HydrationBoundary>
  )
}
