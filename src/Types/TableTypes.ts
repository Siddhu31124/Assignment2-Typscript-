export interface TransactionTableData {id: number, 
    transaction_name: string, 
    type: string, 
    category: string, 
    amount: number, 
    date:string}

export interface TransactionTableType {data:{transactions:TransactionTableData[]},
    head?:boolean,
    tableClass?:string}

