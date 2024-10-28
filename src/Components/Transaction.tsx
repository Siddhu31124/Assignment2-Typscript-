import { useEffect } from "react";
import { observer } from "mobx-react";

import Loader from "./CommonComponents/Loader";
import ModalLayout from "./CommonComponents/ModalLayout";
import TransactionTable from "./CommonComponents/TransactionTable";
import MobileDetailsContainer from "./MobileDetailsContainer";
import TransactionStore from "../Store/TranactionStore";
import useFetchInitialData from "../useFetchIntialData";
import mainStore from "../Store/ModalStore";
import formatData from "../utils/formatData";
import {
  allTransactionMobileStyle,
  allTransactionTableStyle,
  loaderStyle,
  transactionTableMain,
} from "../utils/Styles";

const Transaction = observer(() => {
  const { data, isPending } = useFetchInitialData();

  useEffect(() => {
    if (data) {
      console.log(data.transactions);
      console.log(formatData(data.transactions));
      TransactionStore.setTransactionData(formatData(data.transactions));
    }
  }, [data]);

  const allTransactionData = () => {
    switch (true) {
      case data !== undefined: {
        return (
          <>
            <main className={allTransactionTableStyle}>
              <TransactionTable
                data={{ transactions: TransactionStore.TransactionsData }}
                head
              />
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
    }
  };

  return (
    <div className={transactionTableMain}>
      <ModalLayout />
      {allTransactionData()}
    </div>
  );
});

export default Transaction;
