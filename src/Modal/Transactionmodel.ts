import { TransactionData } from "../Types/CommonTypes";
import { makeAutoObservable } from "mobx";

class TransactionModel {
  id: number;
  userId: number;
  name: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  constructor(transaction: TransactionData) {
    this.name = transaction.name;
    this.type = transaction.type;
    this.category = transaction.category;
    this.amount = transaction.amount;
    this.date = transaction.date;
    this.id = transaction.id;
    this.userId = transaction.userId;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  editTransactionMethod(newData: TransactionData) {
    this.id = newData.id;
    this.userId = newData.userId;
    this.name = newData.name;
    this.type = newData.type;
    this.category = newData.category;
    this.amount = newData.amount;
    this.date = newData.date;
  }
}

export default TransactionModel;
