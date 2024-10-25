export type TotalCreditAndDebit = { type: string; sum: number }[];
//use camel case
//Do not give string type for the constant values
// export interface TransactionData {
//   id: number;
//   transaction_name: string;
//   type: string;
//   category: string;
//   amount: number;
//   date: string;
//   user_id: number;
// }

// //use base and extended transaction names
// export interface AddTransactionData {
//   name: string;
//   type: string;
//   category: string;
//   amount: number;
//   date: string;
// }

export interface BaseTransactionData {
  name: string;
  type: string;
  category: string;
  amount: number;
  date: string;
}

// TransactionData extends BaseTransactionData and adds specific fields
export interface TransactionData extends BaseTransactionData {
  id: number;
  transaction_name: string;
  user_id: number;
}

//rename items name
//remove type implementation
export interface DropdownProps {
  optionName: { name: string }[];
  types?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface LoginData {
  email: string;
  password: string;
}
