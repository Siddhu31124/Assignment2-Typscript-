export type CommonTotalCreditAndDebit = { type:string,sum:number}[]
export interface TransactionDataType {id: number, transaction_name: string, type: string, category: string, amount: number,date:string}
export interface AddTransactionDataType { transaction_name: string, type: string, category: string, amount: number,date:string}
export interface EditTransactionDataType { id: number,transaction_name: string, type: string, category: string, amount: number,date:string}
export interface DropdownPropsTypes {itemsName:{name:string}[],inputId:string,types?:boolean}
export interface LoginTypes {email:string,password:string}
