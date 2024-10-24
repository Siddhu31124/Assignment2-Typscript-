import { useQuery } from "@tanstack/react-query";

import { fetchAllTransaction } from "../http";
import Loader from "./CommonComponents/Loader";
import ModalLayout from "./CommonComponents/ModalLayout";
import TransactionTable from "./CommonComponents/TransactionTable";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";
import MobileDetailsContainer from "./MobileDetailsContainer";
import mainStore from "../Store/MainStore";
import {
  allTransactionMobileStyle,
  allTransactionTableStyle,
  loaderStyle,
  transactionTableMain,
} from "../utils/Styles";
import { TransactionDataType } from "../Types/CommonTypes";
import { observer } from "mobx-react";

const  Transaction = observer(()=> {
  const { data, isPending, isError }:
  {data:{transactions:TransactionDataType[]} | undefined,
  isPending:boolean,
  isError:boolean} = useQuery({
    queryKey: [QUERY_KEY, "all"],
    queryFn: fetchAllTransaction,
  });
  const allTransactionData = () => {
    switch (true) {
      case data !== undefined: {
        return (
          <>
            <main className={allTransactionTableStyle}>
              <TransactionTable data={data} head />
            </main>
            <main
              className={allTransactionMobileStyle}
              onClick={mainStore.handelCloseMenu}
            >
              <MobileDetailsContainer data={data} />
            </main>
          </>
        );
      }
      case isPending: {
        return (
          <div className={loaderStyle}>
            <Loader />
          </div>
        );
      }
      case isError: {
        return (
          <div className="align-middle pt-96">
            <h1 className="text-3xl font-bold text-red-600">{FAIL_ERROR}</h1>
          </div>
        );
      }
    }
  };

  return (
    <div className={transactionTableMain}>
      <ModalLayout />
      {allTransactionData()}
    </div>
  );
})

export default Transaction
