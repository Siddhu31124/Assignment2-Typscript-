import { makeAutoObservable } from "mobx";
import { TransactionData } from "../Types/CommonTypes";
import { CREDIT_INDEX,DEBIT_INDEX } from "../Constants";
//Rename with underscore
class _TransactionStore {
  //Remove the below unused state
  transactionData: TransactionData[] = [];
  totalTransaction:{type:string,sum:number}[]=[]

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  get getTransactionsData() {
    return this.transactionData;
  }
  get gettotalTransactionData(){
    return this.totalTransaction
  }

  //Do not add two variants of methods for same use case
  //Do not use arrow functions in the stores
  addTransaction(addTransactionDetails: TransactionData) {
    this.transactionData.push(addTransactionDetails);
    if(addTransactionDetails.type==='credit'){
      this.totalTransaction[CREDIT_INDEX].sum+=addTransactionDetails.amount
    }
    else{
      this.totalTransaction[DEBIT_INDEX].sum+=addTransactionDetails.amount
    }
  }

  editTransaction(editTransactionDetails: TransactionData) {
    let previousAmount=0
    const updatedData = this.transactionData.map((eachTransaction) => {
      if (eachTransaction.id === editTransactionDetails.id) {
        previousAmount=eachTransaction.amount
        return editTransactionDetails;
      }
      return eachTransaction;
    });
    this.transactionData = updatedData;
    const editDetails = this.transactionData.filter((eachTransaction) => (eachTransaction.id === editTransactionDetails.id) )
    if(editDetails[0].type==='credit'){
      this.totalTransaction[CREDIT_INDEX].sum+=editDetails[0].amount-previousAmount
    }
    else{
      this.totalTransaction[DEBIT_INDEX].sum+=editDetails[0].amount-previousAmount
    }
  }

  //deleteId arg and the types for it does't match
  deleteTransaction(deleteId: number) {
    this.transactionData = this.transactionData.filter(
      (eachTransaction) => eachTransaction.id !== deleteId
    );
    const deleteDetails = this.transactionData.filter(
      (eachTransaction) => eachTransaction.id === deleteId
    );
    if(deleteDetails[0].type==='credit'){
      this.totalTransaction[CREDIT_INDEX].sum-=deleteDetails[0].amount
    }
    else{
      this.totalTransaction[DEBIT_INDEX].sum-=deleteDetails[0].amount
    }
    //Remove consoles
  }
}

  //We shouldn't calculate the total in frontend
  //No magic numbers

const TransactionStore = new _TransactionStore();
export default TransactionStore;
