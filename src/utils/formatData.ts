import { TransactionData } from "../Types/CommonTypes";

interface data {
    transaction_name:string,
    type: data.type,
    category: data.category,
    amount: data.amount,
    date: data.date,
    userId: data.user_id,

}
export default function formatData(data: ) {
  return {
    name: data.transaction_name,
    type: data.type,
    category: data.category,
    amount: data.amount,
    date: data.date,
    userId: data.user_id,
  };
}
