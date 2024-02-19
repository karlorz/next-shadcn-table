import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getReports } from "@/utils/api-requests";
import ListChart from "./list-chart";

export default async function ReportsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListChart />
    </HydrationBoundary>
  );
}