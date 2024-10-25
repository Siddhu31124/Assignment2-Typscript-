export type TotalCreditAndDebit = { type:string,sum:number}[]
export interface TransactionDataType {id: number, transaction_name: string, type: string, category: string, amount: number,date:string,user_id:number}
export interface AddTransactionDataType { name: string, type: string, category: string, amount: number,date:string}
export interface DropdownPropsTypes {itemsName:{name:string}[],inputId:string,types?:boolean,value?:string,onChange?:(event :React.ChangeEvent<HTMLInputElement>)=>void}
export interface LoginTypes {email:string,password:string}
