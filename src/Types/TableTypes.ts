export interface DataType {id: number, 
    transaction_name: string, 
    type: string, 
    category: string, 
    amount: number, 
    date:string}

export interface TransactionTableType {data:{transactions:DataType[]},
    head?:boolean,
    tableClass?:string}

