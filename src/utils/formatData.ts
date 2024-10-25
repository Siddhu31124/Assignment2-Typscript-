interface Data {
    id: number;
    transaction_name: string;
    type: string;
    category: string;
    amount: number;
    date: string;
    user_id: number;    
}

export default function formatData(data:Data[]){
    let updatedData=data.map((eachItems)=>({
        name:eachItems.transaction_name,
        id:eachItems.id,
        type:eachItems.type,
        category:eachItems.category,
        amount:eachItems.amount,
        date:eachItems.date,
        userId:eachItems.user_id
    }))
    return updatedData
}