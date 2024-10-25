import { useEffect } from "react";
import { observer } from "mobx-react";


import Loader from "./CommonComponents/Loader";
import ModalLayout from "./CommonComponents/ModalLayout";
import TransactionTable from "./CommonComponents/TransactionTable";
import MobileDetailsContainer from "./MobileDetailsContainer";
import TransactionStore from "../Store/TranactionStore";
import useFetchInitialData from "../useFetchIntialData";
import mainStore from "../Store/MainStore";
import {
  allTransactionMobileStyle,
  allTransactionTableStyle,
  loaderStyle,
  transactionTableMain,
} from "../utils/Styles";


const  Transaction = observer(()=> {
  const{data,isPending}=useFetchInitialData()

  useEffect(()=>{
    if(data){
      TransactionStore.setTransactionData(data.transactions)
    }
  },[data])
  
  const allTransactionData = () => {
    switch (true) {
      case data !== undefined: {
        return (
          <>
            <main className={allTransactionTableStyle}>
              <TransactionTable data={{transactions:TransactionStore.getTransactionsData}} head />
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
})

export default Transaction
