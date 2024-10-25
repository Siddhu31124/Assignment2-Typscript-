import { makeAutoObservable } from "mobx";
import { TopThreeTransaction,TransactionData } from "../Types/TransactionTypes";

class TransactionsMethods{

    topThreeTransaction :TopThreeTransaction[]=[]
    transactionData:TransactionData[]=[]

    constructor(){
        makeAutoObservable(this)
    }

    setTransactionData(newData: TransactionData[]) {
        this.transactionData = newData;
    }

    get getTransactionsData(){
        return this.transactionData
    }
    
    addTransaction=(addTransactionDetails:TransactionData)=>{
       this.transactionData.push(addTransactionDetails)
    }

    editTransaction=(editTransactionDetails:TransactionData)=>{
        const updatedData =this.transactionData.map((eachTransaction)=>{
            if(eachTransaction.id===editTransactionDetails.id){
                return editTransactionDetails
            }
            return eachTransaction
        })
        this.transactionData = updatedData
    }

    deleteTransaction=(deleteId:{id:number})=>{
        this.transactionData=this.transactionData.filter((eachTransaction)=> eachTransaction.id !==deleteId.id)
        console.log(deleteId)

    }

    get topTransaction(){
        let credit=0
        let debit=0
        this.transactionData.map((eachTransaction)=>{
            if(eachTransaction.type==='credit'){
                credit=eachTransaction.amount+credit
            }else{
                debit=eachTransaction.amount+debit
            }
        })
    return [{type:'debit',sum:debit},{type:'credit',sum:credit}]
}
    
}

const TransactionStore=new TransactionsMethods()
export default TransactionStore