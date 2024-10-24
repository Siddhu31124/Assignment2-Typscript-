import { MdCancel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { CiWarning } from "react-icons/ci";
import toast from "react-hot-toast";

import { queryClient, handleTransactionDelete } from "../http";
import Loader from "./CommonComponents/Loader";
import { QUERY_KEY } from "../Constants";
import Modal from "./CommonComponents/Modal";
import mainStore from "../Store/MainStore";
import { observer } from "mobx-react";

const DeleteModal = observer(() => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteFn"],
    mutationFn: handleTransactionDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
      closeModalFunction(typeOfModal);
      toast.success("Deleted Successfully");
    },
  });

  const isOpen = mainStore.modalStates.isDelete;
  const closeModalFunction = mainStore.handelCloseModal;
  const delete_transaction_id = mainStore.selectedData;
  const typeOfModal = "isDelete";

  function handelDelete(delete_transaction_id: string) {
    mutate({ id: delete_transaction_id });
  }

  const deleteMsg = () => {
    return (
      <div className="flex justify-between mb-2">
        <div className="flex gap-3 items-center">
          <CiWarning className="text-orange-400 text-3xl font-bold" />
          <h3 className="font-bold text-xl">
            Are you sure you want to delete this transaction?
          </h3>
        </div>
        <button
          type="button"
          className="font-bold text-2xl"
          onClick={() => closeModalFunction(typeOfModal)}
        >
          <MdCancel />
        </button>
      </div>
    );
  };

  if (isPending) {
    return (
      <Modal isOpen={isOpen} style="modal p-5">
        <div className="pt-4 pl-56 mr-2">
          <Loader height={50} width={50} />
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      style="bg-slate-100 dark:bg-slate-950 dark:text-white modal p-5"
    >
      {deleteMsg()}
      <p className="text-gray-400 mb-2">
        Once deleted, the transaction cannot be undone.
      </p>
      <p className="flex gap-4 mb-1">
        <button
          className="border-2 p-2 rounded-lg text-sm"
          onClick={() => closeModalFunction(typeOfModal)}
        >
          No, leave it
        </button>
        <button
          className="bg-red-600 p-2 rounded-lg text-sm text-white"
          onClick={() => handelDelete(delete_transaction_id)}
        >
          Delete
        </button>
      </p>
    </Modal>
  );
});

export default DeleteModal;