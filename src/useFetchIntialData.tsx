import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "./Constants";
import { fetchAllTransaction } from "./http";

const useFetchInitialData = () => {
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEY, "all"],
    queryFn: fetchAllTransaction,
  });
  return { data, isPending };
};

export default useFetchInitialData;
