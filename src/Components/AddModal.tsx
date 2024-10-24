import { useMutation } from "@tanstack/react-query";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";

import { queryClient, handelAddTransaction } from "../http";
import Loader from "./CommonComponents/Loader";
import Modal from "./CommonComponents/Modal";
import Input from "./CommonComponents/Input";
import { QUERY_KEY } from "../Constants";
import Dropdown from "./CommonComponents/Dropdown";
import { TRANSACTION_CATEGORY, TRANSACTION_TYPE } from "../Constants";
import { loaderStyle } from "../utils/Styles";
import { AddTransactionDataType } from "../Types/CommonTypes";
import mainStore from "../Store/MainStore";
import { observer } from "mobx-react";

const AddModal = observer(() => {
  let mutateFun = handelAddTransaction;
  const { mutate, isPending } = useMutation({
    mutationFn: mutateFun,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
      closeModalFunction(typeOfModal);
      toast.success("Added Successfully");
    },
  });

  const isOpen = mainStore.modalStates.isAdd;
  const closeModalFunction = mainStore.handelCloseModal;
  const typeOfModal = "isAdd";

  function handelAddData(event: React.FormEvent) {
    event.preventDefault();
    let data = new FormData(event.target as HTMLFormElement);
    let formData: AddTransactionDataType = {
      transaction_name: data.get("name") as string,
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
          label_name="Enter Name"
          type="text"
          id="transactionName"
          name="name"
          placeholder="Transaction Name"
        />
        <Dropdown inputId="type" itemsName={TRANSACTION_TYPE} types />
        <Dropdown inputId="category" itemsName={TRANSACTION_CATEGORY} />
        <Input
          label_name="Amount"
          type="text"
          id="amount"
          name="amount"
          placeholder="Amount"
        />
        <Input
          label_name="Date"
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