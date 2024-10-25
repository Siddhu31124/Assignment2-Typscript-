export type TotalCreditAndDebit = { type: string; sum: number }[];

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
  userId: number;
}

//rename items name
//remove type implementation
export interface DropdownProps {
  optionName: { name: string }[];
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface LoginData {
  email: string;
  password: string;
}
