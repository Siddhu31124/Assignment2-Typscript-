import { useMutation } from "@tanstack/react-query";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { observer } from "mobx-react";

import { handelAddTransaction } from "../http";
import Loader from "./CommonComponents/Loader";
import Modal from "./CommonComponents/Modal";
import Input from "./CommonComponents/Input";
import Dropdown from "./CommonComponents/Dropdown";
import { TRANSACTION_CATEGORY, TRANSACTION_TYPE } from "../Constants";
import { loaderStyle } from "../utils/Styles";
import mainStore from "../Store/ModalStore";
import TransactionStore from "../Store/TranactionStore";
import { formateObjData } from "../utils/formatData";

const AddModal = observer(() => {
  let mutateFun = handelAddTransaction;
  const { data, mutate, isPending } = useMutation({
    mutationFn: mutateFun,
    onSuccess: () => {
      closeModalFunction(typeOfModal);
      toast.success("Added Successfully");
    },
  });
  useEffect(() => {
    if (data) {
      TransactionStore.addTransaction(
        formateObjData(data.insert_transactions_one)
      );
    }
  }, [data]);

  const isOpen = mainStore.modalStates.isAdd;
  const closeModalFunction = mainStore.handelCloseModal;
  const typeOfModal = "isAdd";

  function handelAddData(event: React.FormEvent) {
    event.preventDefault();
    let data = new FormData(event.target as HTMLFormElement);
    let formData = {
      name: data.get("name") as string,
      type: data.get("type") as string,
      category: data.get("category") as string,
      amount: Number(data.get("amount")),
      date: data.get("date") as string,
    };
    mutate({ data: formData });
  }

  if (isPending) {
    return (
      <Modal
        isOpen={isOpen}
        style="modal bg-slate-100 dark:bg-slate-950 dark:text-white p-5"
      >
        <div className={loaderStyle}>
          <Loader />
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      style="modal bg-slate-100 dark:bg-slate-950 dark:text-white p-5"
    >
      <form
        className="p-6 flex flex-col gap-4 text-gray-500 font-normal"
        onSubmit={handelAddData}
      >
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl text-black dark:text-white">
            Add Transaction
          </h3>
          <button
            type="button"
            onClick={() => closeModalFunction(typeOfModal)}
            className="font-bold text-2xl"
          >
            <MdCancel />
          </button>
        </div>
        <p>Fill The Transaction Details</p>
        <Input
          labelName="Enter Name"
          type="text"
          id="transactionName"
          name="name"
          placeholder="Transaction Name"
        />
        <Dropdown optionName={TRANSACTION_TYPE} name="type" />
        <Dropdown optionName={TRANSACTION_CATEGORY} name="category" />
        <Input
          labelName="Amount"
          type="text"
          id="amount"
          name="amount"
          placeholder="Amount"
        />
        <Input
          labelName="Date"
          type="date"
          id="date"
          name="date"
          placeholder="Date"
        />
        <button className="bg-blue-600 p-2 text-white font-bold rounded-lg">
          Add Transactions
        </button>
      </form>
    </Modal>
  );
});

export default AddModal;
