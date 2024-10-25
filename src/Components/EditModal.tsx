import dayjs from "dayjs";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";

import Modal from "./CommonComponents/Modal";
import Input from "./CommonComponents/Input";
import { handelEditTransaction } from "../http";
import Loader from "./CommonComponents/Loader";
import Dropdown from "./CommonComponents/Dropdown";
import { loaderStyle } from "../utils/Styles";
import mainStore from "../Store/MainStore";
import {AddTransactionDataType } from "../Types/CommonTypes";
import TransactionStore from "../Store/TranactionStore";
import {
  TRANSACTION_CATEGORY,
  TRANSACTION_TYPE,
  DATA_FORMAT,
} from "../Constants";


const  EditModal=observer(()=> {
  const isOpen = mainStore.modalStates.isEdit;
  const closeModalFunction = mainStore.handelCloseModal;
  const editTransactionData = mainStore.selectedData;
  const typeOfModal = "isEdit";


  interface InputStateType {
    id: number;
    transaction_name: string;
    type: string;
    category: string;
    amount: number;
    date: string;
} 
  const [inputValues, setInputValues] = useState<InputStateType>(editTransactionData);

  useEffect(() => {
    setInputValues(editTransactionData);
  }, [editTransactionData]);

  const mutateFun = handelEditTransaction;
  const { data,mutate, isPending } = useMutation({
    mutationFn: mutateFun,
    onSuccess: () => {
      closeModalFunction(typeOfModal);
      toast.success(`Updated Successfully`);
    },
  });
  
  useEffect(()=>{
    if(data){
      TransactionStore.editTransaction(data.update_transactions_by_pk)
    }
  },[data])

  function handelChange(event:React.ChangeEvent<HTMLInputElement> , typeInput:string) {
    setInputValues((prevVal) => {
      return { ...prevVal, [typeInput]: event.target.value };
    });
  }

  function handelEditData(event :React.FormEvent<HTMLInputElement>, id:number) {
    event.preventDefault();
    let data = new FormData(event.target as HTMLFormElement);
    let formData: AddTransactionDataType  = {
      name: data.get("name") as string,
      type: data.get("type") as string,
      category: data.get("category") as string,
      amount: Number(data.get("amount")),
      date: data.get("date") as string,
    };;
    mutate({ data: formData, id: id });
  }

  if (isPending) {
    return (
      <Modal isOpen={isOpen} style=" modal p-5">
        <div className={loaderStyle}>
          <Loader />
        </div>
      </Modal>
    );
  }

  const cancelButton = () => {
    return (
      <button
        type="button"
        onClick={() => closeModalFunction(typeOfModal)}
        className="font-bold text-2xl"
      >
        <MdCancel />
      </button>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      style="bg-slate-100 dark:bg-slate-950 dark:text-white modal p-5"
    >
      <form
        className="p-6 flex flex-col gap-4"
        onSubmit={(event) => handelEditData(event, editTransactionData.id)}
      >
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl dark:text-white">
            Edit Transaction
          </h3>
          {cancelButton()}
        </div>

        <p>Fill The Edit Details</p>

        <Input
          label_name="Transaction Name"
          type="text"
          id="transactionName"
          name="name"
          placeholder="Transaction Name"
          value={inputValues ? inputValues.transaction_name : ""}
          onChange={(event :React.ChangeEvent<HTMLInputElement>) => handelChange(event, "transaction_name")}
        />

        <Dropdown
          inputId="type"
          itemsName={TRANSACTION_TYPE}
          types
          value={inputValues ? inputValues.type : ""}
          onChange={(event :React.ChangeEvent<HTMLSelectElement>) => handelChange(event, "type")}
        />

        <Dropdown
          inputId="category"
          itemsName={TRANSACTION_CATEGORY}
          types
          value={inputValues ? inputValues.category : ""}
          onChange={(event :React.ChangeEvent<HTMLSelectElement>) => handelChange(event, "category")}
        />

        <Input
          label_name="Amount"
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
          value={inputValues ? inputValues.amount : ""}
          onChange={(event :React.ChangeEvent<HTMLInputElement>) => handelChange(event, "amount")}
        />

        <Input
          label_name="Date"
          type="date"
          id="date"
          name="date"
          placeholder="Date"
          value={inputValues ? dayjs(inputValues.date).format(DATA_FORMAT) : ""}
          onChange={(event :React.ChangeEvent<HTMLInputElement>) => handelChange(event, "date")}
        />

        <button className="bg-blue-600 p-2 text-white font-bold rounded-lg">
          Edit Transactions
        </button>
      </form>
    </Modal>
  );
})
export default EditModal
