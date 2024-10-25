import { TotalCreditAndDebit } from "../Types/CommonTypes"

const totalCreditAndDebit = (totals_credit_debit_transactions : TotalCreditAndDebit)=>{
    let debitData=totals_credit_debit_transactions[0].sum
    if(totals_credit_debit_transactions.length>1){
        let creditData=totals_credit_debit_transactions[1].sum 
        let debitData=totals_credit_debit_transactions[0].sum
        return { debit:debitData,credit:creditData}
    }
    else if (totals_credit_debit_transactions.length===0){
        return {debit:0,credit:0}
    }
    else if(totals_credit_debit_transactions[0].type==='credit'){
        let creditData=totals_credit_debit_transactions[0].sum 
        return {debit:0,credit:creditData}
    }
    return {debitData,credit:0}
}
export default totalCreditAndDebit