import { Total } from "../Store/TranactionStore";

class TotalTransactionModel {
  type: string;
  sum: number;
  constructor(total: Total) {
    this.type = total.type;
    this.sum = total.sum;
  }
}
export default TotalTransactionModel;
