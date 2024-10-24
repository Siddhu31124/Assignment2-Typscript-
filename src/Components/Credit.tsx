import { useQuery } from "@tanstack/react-query";

import { fetchAllTransaction } from "../http";
import TransactionTable from "./CommonComponents/TransactionTable";
import Loader from "./CommonComponents/Loader";
import ModalLayout from "./CommonComponents/ModalLayout";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";
import MobileDetailsContainer from "./MobileDetailsContainer";
import {
  allTransactionMobileStyle,
  allTransactionTableStyle,
  transactionTableMain,
} from "../utils/Styles";
import { TransactionDataType } from "../Types/CommonTypes";
import { loaderStyle } from "../utils/Styles";

export default function Credit() {
  const { data, isPending, isError }:
  {data:{transactions:TransactionDataType[]} | undefined,
  isPending:boolean,
  isError:boolean}= useQuery({
    queryKey: [QUERY_KEY, "creditData"],
    queryFn: fetchAllTransaction,
  });

  const creditData = () => {
    switch (true) {
      case data !== undefined: {
        let creditTransactionArray = data.transactions.filter(
          (each) => each.type === "credit"
        );
        return (
          <>
            <main className={allTransactionTableStyle}>
              <TransactionTable
                data={{ transactions: creditTransactionArray }}
                head
              />
            </main>
            <main className={allTransactionMobileStyle}>
              <MobileDetailsContainer
                data={{ transactions: creditTransactionArray }}
              />
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
      {creditData()}
    </div>
  );
}
