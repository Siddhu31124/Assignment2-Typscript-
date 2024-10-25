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
  setTotalTransaction(data:{type:string,sum:number}[]){
    this.totalTransaction=data
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
  //deleteId arg and the types for it does't match
  deleteTransaction(deleteId: number) {
    const deleteDetails = this.transactionData.filter(
      (eachTransaction) => eachTransaction.id === deleteId
    );
    this.transactionData = this.transactionData.filter(
      (eachTransaction) => eachTransaction.id !== deleteId
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
