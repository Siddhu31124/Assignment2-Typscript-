import { observer } from "mobx-react";
import { useEffect } from "react";

import TransactionTable from "./CommonComponents/TransactionTable";
import ModalLayout from "./CommonComponents/ModalLayout";
import MobileDetailsContainer from "./MobileDetailsContainer";
import TransactionStore from "../Store/TranactionStore";
import Loader from "./CommonComponents/Loader";
import useFetchInitialData from "../useFetchIntialData";
import {
  allTransactionMobileStyle,
  allTransactionTableStyle,
  loaderStyle,
  transactionTableMain,
} from "../utils/Styles";

const Credit= observer(()=> {
  const{data,isPending}=useFetchInitialData()
  useEffect(()=>{
    if(data){
      TransactionStore.setTransactionData(data.transactions)
    }
  },[data])
  
  const creditData = () => {
    switch (true) {
      case data!==undefined: {
        let creditTransactionArray = TransactionStore.getTransactionsData.filter(
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
      case isPending :{
        return <div className={loaderStyle}>
            <Loader/>
        </div>
      }
    }
  };

  return (
    <div className={transactionTableMain}>
      <ModalLayout />
      {creditData()}
    </div>
  );
})

export default Credit
