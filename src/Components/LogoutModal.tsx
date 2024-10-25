import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { useNavigate } from "react-router";
import { observer } from "mobx-react";

import Modal from "./CommonComponents/Modal";
import TransactionStore from "../Store/TranactionStore";
import { LOCAL_TOKEN, LOCAL_ADMIN, LOGIN_ROUTE } from "../Constants";
import { queryCache } from "../http";
import mainStore from "../Store/ModalStore";

const LogoutModal= observer(()=> {
  const navigate = useNavigate();
  
  function handelLogOut() {
    TransactionStore.transactionData=[]
    localStorage.removeItem(LOCAL_TOKEN);
    let admin : string | null = localStorage.getItem(LOCAL_ADMIN);
    if (admin) {
      localStorage.removeItem(LOCAL_ADMIN);
    }
    queryCache.clear();
    navigate(LOGIN_ROUTE);
    closeModalFunction(typeOfModal);
    toast.success("Logout Successfully");
  }

  const isOpen : boolean = mainStore.modalStates.isLogout;
  const closeModalFunction = mainStore.handelCloseModal;
  const typeOfModal = "isLogout";

  const logoutMsg = () => {
    return (
      <div className="flex justify-between mb-2">
        <div className="flex gap-3 items-center">
          <CiWarning className=" text-orange-400 text-3xl font-bold" />
          <h3 className="font-bold text-xl">
            Are You Sure You Want to Logout ?
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

  return (
    <div>
      <Modal
        isOpen={isOpen}
        style="deleteModel bg-slate-100 dark:bg-slate-950 dark:text-white modal p-5"
      >
        <div>
          {logoutMsg()}
          <p className="text-gray-400 mb-2">You will be Logout</p>
          <p className="flex gap-4 mb-1">
            <button
              className="bg-red-600 p-2 rounded-lg text-sm text-white"
              onClick={handelLogOut}
            >
              Logout
            </button>
            <button
              className="border-2 p-2 rounded-lg text-sm"
              onClick={() => closeModalFunction(typeOfModal)}
            >
              Stay In
            </button>
          </p>
        </div>
      </Modal>
    </div>
  );
})

export default LogoutModal
