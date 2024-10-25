import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { useEffect } from "react";

import { fetchTotalTransaction } from "../http";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";
import totalCreditAndDebit from "../utils/TotalCreditAndDebit";
import { totalTransactionBlocks } from "../utils/Styles"
import { TotalCreditAndDebit } from "../Types/CommonTypes";
import TransactionStore from "../Store/TranactionStore";

const TotalCreditDebitContainer=observer(()=> {
  const { data, isPending, isError }:
  {data:{totals_credit_debit_transactions:TotalCreditAndDebit} | undefined,
  isPending:boolean,
  isError:boolean}= useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchTotalTransaction,
  });

    useEffect(()=>{
      if(data){
        TransactionStore.setTotalTransaction(data.totals_credit_debit_transactions)
    }
    },[data])

    


  const msgContent = () => {
    switch (true) {
      case isPending: {
        return <p className="text-xl">Loading...</p>;
      }
      case isError: {
        return <p className="text-red-500 text-xl ">{FAIL_ERROR}</p>;
      }
      default: {
        return null;
      }
    }
  };

  const totalDataFunction = () => {
    if (TransactionStore.gettotalTransactionData.length>0) {
      let totalData = totalCreditAndDebit(TransactionStore.gettotalTransactionData
      )
      return (
        <div className=" flex flex-col gap-2 lg:flex-row lg:justify-between mb-5 ">
          <div className={`text-green-400 ${totalTransactionBlocks}`}>
            <div className="flex flex-col gap-1">
              {totalData.credit}
              {msgContent()}
              <p className="text-base">Credit</p>
            </div>
            <div>
              <img src="Credit.png" className="w-[100px]" />
            </div>
          </div>
          <div className={`text-red-600 ${totalTransactionBlocks}`}>
            <div className="flex flex-col gap-1">
              {totalData.debit}
              {msgContent()}
              <p className="text-base">Debit</p>
            </div>
            <img src="Debit.png" className="w-[100px]" />
          </div>
        </div>
      );
    }
  };

  return <>{totalDataFunction()}</>;
})
export default TotalCreditDebitContainer
