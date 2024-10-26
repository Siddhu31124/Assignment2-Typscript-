import TransactionStore from "../Store/TranactionStore";
import { CREDIT_INDEX, DEBIT_INDEX } from "../Constants";
import { TYPE_OF_TRANSACTION_CREDIT } from "../Constants";
import { TransactionData } from "../Types/CommonTypes";

class TransactionModal {
  id: number;
  name: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  userId: number;
  constructor(
    id: number,
    name: string,
    type: string,
    category: string,
    amount: number,
    date: string,
    userId: number
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.category = category;
    this.amount = amount;
    this.date = date;
    this.userId = userId;
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      category: this.category,
      amount: this.amount,
      date: this.date,
      userId: this.userId,
    };
  }

  editTransaction() {
    let previousAmount = 0;
    const updatedData = TransactionStore.TransactionsData.map(
      (eachTransaction) => {
        if (eachTransaction.id === this.getData().id) {
          previousAmount = eachTransaction.amount;
          return this.getData();
        }
        return eachTransaction;
      }
    );
    TransactionStore.transactionData = updatedData;

    const editDetails = TransactionStore.TransactionsData.find(
      (eachTransaction) => eachTransaction.id === this.getData().id
    );
    if (editDetails) {
      this.totalDetails(editDetails, previousAmount);
    }
  }

  totalDetails(editDetails: TransactionData, previousAmount: number) {
    if (editDetails.type === TYPE_OF_TRANSACTION_CREDIT) {
      TransactionStore.totalTransaction[CREDIT_INDEX].sum +=
        editDetails.amount - previousAmount;
    } else {
      TransactionStore.totalTransaction[DEBIT_INDEX].sum +=
        editDetails.amount - previousAmount;
    }
  }
}

export default TransactionModal;

//rename as TrasactionModel
//add transation attributes here
