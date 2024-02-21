import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getReports } from "@/utils/api-requests";
import ListCharta1 from "./list-charta1";
import ListCharta2 from "./list-charta2";
import ListCharta3 from "./list-charta3";

export default async function ReportsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListCharta1 />
      <ListCharta2 />
      <ListCharta3 />
    </HydrationBoundary>
  );
}