import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "./Constants";
import { fetchAllTransaction } from "./http";
import { TransactionData } from "./Types/CommonTypes";

const useFetchInitialData= ()=>  {
const { data ,isPending }:
  {data:{transactions:TransactionData[]} | undefined,
  isPending:boolean,
  isError:boolean} = useQuery({
    queryKey: [QUERY_KEY, "all"],
    queryFn: fetchAllTransaction
  });
  return{data,isPending}
}

export default useFetchInitialData