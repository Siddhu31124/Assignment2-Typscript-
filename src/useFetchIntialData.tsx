import { useQuery } from "@tanstack/react-query";

import { ActionTypeData } from "./Types/ContextTypes";
import { QUERY_KEY } from "./Constants";
import { fetchAllTransaction } from "./http";

const useFetchInitialData= ()=>  {
const { data ,isPending }:
  {data:{transactions:ActionTypeData[]} | undefined,
  isPending:boolean,
  isError:boolean} = useQuery({
    queryKey: [QUERY_KEY, "all"],
    queryFn: fetchAllTransaction,
  });
  return{data,isPending}
}

export default useFetchInitialData