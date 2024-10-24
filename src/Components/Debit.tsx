import { useQuery } from "@tanstack/react-query";

import { fetchAllTransaction } from "../http";
import TransactionTable from "./CommonComponents/TransactionTable";
import Loader from "./CommonComponents/Loader";
import ModalLayout from "./CommonComponents/ModalLayout";
import { FAIL_ERROR, QUERY_KEY } from "../Constants";
import MobileDetailsContainer from "./MobileDetailsContainer";
import {
  allTransactionMobileStyle,
  allTransactionTableStyle,
  transactionTableMain,
  loaderStyle,
} from "../utils/Styles";
import { TransactionDataType } from "../Types/CommonTypes";

export default function Debit() {
  const { data, isPending, isError }:
  {data:{transactions:TransactionDataType[]} | undefined,
  isPending:boolean,
  isError:boolean} = useQuery({
    queryKey: [QUERY_KEY, "debitData"],
    queryFn: fetchAllTransaction,
  });

  const debitData = () => {
    switch (true) {
      case data !== undefined: {
        let debitTransactionList = data.transactions.filter(
          (each) => each.type === "debit"
        );
        return (
          <>
            <main className={allTransactionTableStyle}>
              <TransactionTable
                data={{ transactions: debitTransactionList }}
                head
              />
            </main>
            <main className={allTransactionMobileStyle}>
              <MobileDetailsContainer
                data={{ transactions: debitTransactionList }}
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
      {debitData()}
    </div>
  );
}
