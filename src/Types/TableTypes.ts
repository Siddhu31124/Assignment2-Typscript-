export interface TransactionTableData {id: number, 
    name: string, 
    type: string, 
    category: string, 
    amount: number, 
    date:string}

export interface TransactionTableType {data:{transactions:TransactionTableData[]},
    head?:boolean,
    tableClass?:string}

