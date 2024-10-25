import { action, makeAutoObservable } from "mobx";
import { TransactionData } from "../Types/CommonTypes";
import {
  TYPE_OF_TRANSACTION_CREDIT,
  TYPE_OF_TRANSACTION_Debit,
} from "../Constants";

//Rename with underscore
class _TransactionStore {
  //Remove the below unused state
  transactionData: TransactionData[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTransactionData(newData: TransactionData[]) {
    this.transactionData = newData;
  }

  get getTransactionsData() {
    return this.transactionData;
  }

  //Do not add two variants of methods for same use case
  //Do not use arrow functions in the stores
  addTransaction(addTransactionDetails: TransactionData) {
    this.transactionData.push(addTransactionDetails);
  }

  editTransaction(editTransactionDetails: TransactionData) {
    const updatedData = this.transactionData.map((eachTransaction) => {
      if (eachTransaction.id === editTransactionDetails.id) {
        return editTransactionDetails;
      }
      return eachTransaction;
    });
    this.transactionData = updatedData;
  }

  //deleteId arg and the types for it does't match
  deleteTransaction(deleteId: number) {
    this.transactionData = this.transactionData.filter(
      (eachTransaction) => eachTransaction.id !== deleteId
    );
    //Remove consoles
  }

  //We shouldn't calculate the total in frontend
  //No magic numbers
  get topTransaction() {
    let credit = 0;
    let debit = 0;
    this.transactionData.map((eachTransaction) => {
      if (eachTransaction.type === TYPE_OF_TRANSACTION_CREDIT) {
        credit = eachTransaction.amount + credit;
      } else {
        debit = eachTransaction.amount + debit;
      }
    });
    return [
      { type: TYPE_OF_TRANSACTION_Debit, sum: debit },
      { type: TYPE_OF_TRANSACTION_CREDIT, sum: credit },
    ];
  }
}

const TransactionStore = new _TransactionStore();
export default TransactionStore;
