import { makeAutoObservable } from "mobx";
import { TYPE_OF_TRANSACTION_CREDIT } from "../Constants";
import TransactionModel from "../Modal/Transactionmodel";
import { TransactionData } from "../Types/CommonTypes";

export interface Total {
  creditAmount: number;
  debitAmount: number;
}

class _TransactionStore {
  transactionData: TransactionModel[];
  totalCreditAmount: number | null;
  totalDebitAmount: number | null;

  constructor() {
    this.transactionData = [];
    this.totalDebitAmount = null;
    this.totalCreditAmount = null;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get TransactionsData() {
    return this.transactionData;
  }

  setTotalTransaction(data: Total) {
    this.totalCreditAmount = data.creditAmount;
    this.totalDebitAmount = data.debitAmount;
  }

  setTransactionData(data: TransactionData[]) {
    this.transactionData = data.map(
      (eachTransaction) => new TransactionModel(eachTransaction)
    );
  }

  addTransaction(addTransactionDetails: TransactionData) {
    const data = new TransactionModel(addTransactionDetails);
    this.transactionData.push(data);
    this.addTransactionTotalData(data);
  }

  addTransactionTotalData(addDetails: TransactionModel) {
    const isTypeCreditAndDefined: boolean =
      addDetails.type === TYPE_OF_TRANSACTION_CREDIT &&
      this.totalCreditAmount !== null;

    if (isTypeCreditAndDefined) {
      this.totalCreditAmount = this.totalCreditAmount ?? 0 + addDetails.amount;
    } else {
      this.totalDebitAmount! = this.totalDebitAmount ?? 0 + addDetails.amount;
    }
  }

  deleteTransaction(deleteId: number) {
    const deleteDetails = this.transactionData.find(
      (eachTransaction) => eachTransaction.id === deleteId
    );
    this.transactionData = this.transactionData.filter(
      (eachTransaction) => eachTransaction.id !== deleteId
    );
    if (deleteDetails) {
      this.deleteTransactionTotal(deleteDetails);
    }
  }

  deleteTransactionTotal(deleteDetails: TransactionData) {
    const isTypeCreditAndDefined: boolean =
      deleteDetails.type === TYPE_OF_TRANSACTION_CREDIT &&
      this.totalCreditAmount !== null;
    if (isTypeCreditAndDefined) {
      this.totalCreditAmount =
        this.totalCreditAmount ?? 0 - deleteDetails.amount;
    } else if (this.totalDebitAmount) {
      this.totalDebitAmount! =
        this.totalDebitAmount ?? 0 - deleteDetails.amount;
    }
  }

  editTransaction(editTransactionDetails: TransactionData) {
    const editData = editTransactionDetails;
    let previousValue = 0;
    const editDetails = this.TransactionsData.find((eachTransaction) => {
      previousValue = eachTransaction.amount;
      return eachTransaction.id === editData.id;
    });
    if (editDetails) {
      editDetails.editTransactionMethod(editData);
      this.totalDetails(editDetails, previousValue);
    }
  }

  totalDetails(editDetails: TransactionModel, previousAmount: number) {
    const isTypeCreditAndDefined: boolean =
      editDetails.type === TYPE_OF_TRANSACTION_CREDIT &&
      this.totalCreditAmount !== null;
    if (isTypeCreditAndDefined) {
      this.totalCreditAmount =
        this.totalCreditAmount ?? 0 + editDetails.amount - previousAmount;
    } else if (this.totalDebitAmount) {
      this.totalDebitAmount =
        this.totalDebitAmount ?? 0 + editDetails.amount - previousAmount;
    }
  }
}

const TransactionStore = new _TransactionStore();
export default TransactionStore;

//Rename with underscore
//Remove the below unused state
//use private access modifiers here
//Use the type interface here
//NO need to add get prefix here
//Do not add two variants of methods for same use case
//Do not use arrow functions in the stores
//deleteId arg and the types for it does't match
//Use find method here
// Delegate to TransactionModel's editTransaction method
//We shouldn't calculate the total in frontend
//No magic numbers
