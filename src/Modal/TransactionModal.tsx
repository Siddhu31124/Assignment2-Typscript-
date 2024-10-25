import { makeAutoObservable } from "mobx";

import { TransactionData } from "../Types/CommonTypes";
import TransactionStore from "../Store/TranactionStore";
import { CREDIT_INDEX,DEBIT_INDEX } from "../Constants";

class __EditTransactionModal{
    
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }
    editTransaction(editTransactionDetails: TransactionData) {
        let previousAmount=0
        const updatedData = TransactionStore.transactionData.map((eachTransaction) => {
          if (eachTransaction.id === editTransactionDetails.id) {
            previousAmount=eachTransaction.amount
            return editTransactionDetails
          }
          return eachTransaction;
        });
        TransactionStore.transactionData = updatedData;
    
        const editDetails = TransactionStore.transactionData.filter((eachTransaction) => (eachTransaction.id === editTransactionDetails.id) )
        if(editDetails[0].type==='credit'){
          TransactionStore.totalTransaction[CREDIT_INDEX].sum+=editDetails[0].amount-previousAmount
        }
        else{
          TransactionStore.totalTransaction[DEBIT_INDEX].sum+=editDetails[0].amount-previousAmount
        }
      }
}

const EditTransactionModal=new __EditTransactionModal()

export default EditTransactionModal