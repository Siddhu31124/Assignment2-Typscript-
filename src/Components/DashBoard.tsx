import { MdOutlineLightMode } from "react-icons/md";
import { useEffect } from "react";
import { observer } from "mobx-react";

import Loader from "./CommonComponents/Loader";
import TotalCreditDebitContainer from "./TotalCreditDebitContainer";
import ModalLayout from "./CommonComponents/ModalLayout";
import TransactionTable from "./CommonComponents/TransactionTable";
import MobileNavBar from "./MobileMenuElement";
import MobileDetailsContainer from "./MobileDetailsContainer";
import { allTransactionDashTableStyle, navBarStyle } from "../utils/Styles";
import mainStore from "../Store/ModalStore";
import TransactionStore from "../Store/TranactionStore";
import { loaderStyle } from "../utils/Styles";
import useFetchInitialData from "../useFetchIntialData";
import formatData from "../utils/formatData";

const DashBoard = observer(() => {
  const { data, isPending } = useFetchInitialData();
  useEffect(() => {
    if (data) {
      TransactionStore.setTransactionData(formatData(data.transactions));
    }
  }, [data]);

  const lastTransaction = () => {
    switch (true) {
      case data !== undefined: {
        return (
          <>
            <TransactionTable
              data={{
                transactions: TransactionStore.TransactionsData.slice(0, 3),
              }}
              tableClass={allTransactionDashTableStyle}
            />
            <MobileDetailsContainer
              data={{
                transactions: TransactionStore.TransactionsData.slice(0, 3),
              }}
            />
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

  const nav = () => {
    return (
      <nav
        className={`${navBarStyle} hidden lg:flex text-black dark:bg-black dark:text-white`}
      >
        <h3 className="text-2xl font-bold">Accounts</h3>
        <p className="flex gap-6">
          <button
            className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
            onClick={() => mainStore.handelOpenModal("isAdd")}
          >
            + Add Transactions
          </button>
          <button className="text-2xl" onClick={mainStore.handelDarkMode}>
            <MdOutlineLightMode />
          </button>
        </p>
      </nav>
    );
  };

  return (
    <div className="w-[100%] flex flex-col bg-slate-50 dark:bg-black dark:text-white">
      <ModalLayout />
      {nav()}
      <MobileNavBar />
      <main className="p-8 h-[93vh]" onClick={mainStore.handelCloseMenu}>
        <TotalCreditDebitContainer />
        <h3 className="mb-3 text-2xl font-bold">Last Transactions</h3>
        {lastTransaction()}
      </main>
    </div>
  );
});

export default DashBoard;
