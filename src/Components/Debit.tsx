import { observer } from "mobx-react";
import { useEffect } from "react";

import TransactionTable from "./CommonComponents/TransactionTable";
import ModalLayout from "./CommonComponents/ModalLayout";
import MobileDetailsContainer from "./MobileDetailsContainer";
import TransactionStore from "../Store/TranactionStore";
import Loader from "./CommonComponents/Loader";
import useFetchInitialData from "../useFetchIntialData";
import formatData from "../utils/formatData";
import {
  allTransactionMobileStyle,
  allTransactionTableStyle,
  loaderStyle,
  transactionTableMain,
} from "../utils/Styles";

const Debit = observer(() => {
  const { data, isPending } = useFetchInitialData();
  useEffect(() => {
    if (data) {
      TransactionStore.setTransactionData(formatData(data.transactions));
    }
  }, [data]);

  const debitData = () => {
    switch (true) {
      case data !== undefined: {
        let debitTransactionList = TransactionStore.TransactionsData.filter(
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
    }
  };

  return (
    <div className={transactionTableMain}>
      <ModalLayout />
      {debitData()}
    </div>
  );
});

export default Debit;
