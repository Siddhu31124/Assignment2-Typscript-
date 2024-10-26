import { makeAutoObservable } from "mobx";
import { TransactionData } from "../Types/CommonTypes";
import { CREDIT_INDEX, DEBIT_INDEX } from "../Constants";
import TransactionModal from "../Modal/TransactionModal";
import { TYPE_OF_TRANSACTION_CREDIT } from "../Constants";

interface total {
  type: string;
  sum: number;
}

class _TransactionStore {
  transactionData: TransactionData[] = [];
  totalTransaction: total[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTotalTransaction(data: total[]) {
    this.totalTransaction = data;
  }

  get TransactionsData() {
    return this.transactionData;
  }
  get TotalTransactionData() {
    return this.totalTransaction;
  }
  setTransactionData(data: TransactionData[]) {
    this.transactionData = data;
  }

  addTransaction(addTransactionDetails: TransactionData) {
    this.transactionData.push(addTransactionDetails);
    this.addTransactionTotalData(addTransactionDetails);
  }

  addTransactionTotalData(addDetails: TransactionData) {
    if (addDetails.type === TYPE_OF_TRANSACTION_CREDIT) {
      this.totalTransaction[CREDIT_INDEX].sum += addDetails.amount;
    } else {
      this.totalTransaction[DEBIT_INDEX].sum += addDetails.amount;
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
    if (deleteDetails) {
      if (deleteDetails.type === TYPE_OF_TRANSACTION_CREDIT) {
        this.totalTransaction[CREDIT_INDEX].sum -= deleteDetails.amount;
      } else {
        this.totalTransaction[DEBIT_INDEX].sum -= deleteDetails.amount;
      }
    }
  }

  editTransaction(editTransactionDetails: TransactionData) {
    const { id, name, type, category, amount, date, userId } =
      editTransactionDetails;
    const transactionModal = new TransactionModal(
      id,
      name,
      type,
      category,
      amount,
      date,
      userId
    );
    transactionModal.editTransaction();
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
