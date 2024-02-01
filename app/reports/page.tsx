import { dehydrate } from "@tanstack/query-core";
import ListReports from "./list-reports";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getReports } from "@/utils/api-requests";

export default async function Hydation() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListReports />
    </HydrationBoundary>
  );
}