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

// interface PageReport extends Omit<Report, 'reports'> {
//   reports: {
//     [key: string]: number
//     // other keys
//   }
// }

// This function can be named anything
// async function getProjects() {
//   const res = await fetch(`https://...`, { cache: 'no-store' })
//   const projects = await res.json()
//   const queryClient = new QueryClient()

//   const 
//   return dehydratedState: dehydrate(queryClient)
// }
// export async function getServerSideProps() {
//   const queryClient = new QueryClient()

//   const user = await queryClient.fetchQuery({
//     queryKey: ['user', email],
//     queryFn: getUserByEmail,
//   })

//   if (user?.userId) {
//     await queryClient.prefetchQuery({
//       queryKey: ['projects', userId],
//       queryFn: getProjectsByUser,
//     })
//   }

//   // For Remix:
//   // return json({ dehydratedState: dehydrate(queryClient) })
//   return { props: { dehydratedState: dehydrate(queryClient) } }
// }
export default async function Page({ params }: { params: { system: string } }) {
  // const system = params.system
  const {system} = params
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
