import dayjs from "dayjs";
import { useState } from "react";
import { observer } from "mobx-react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { DATA_FORMAT,TYPE_OF_TRANSACTION_CREDIT  } from "../Constants";
import { mobileListsStyle } from "../utils/Styles";
import mainStore from "../Store/ModalStore";
import { TransactionData } from "../Types/CommonTypes";

const MobileDetailsList=observer(({ eachItems }:{eachItems:TransactionData})=>{
  
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false);
  function handelAction() {
    setIsOpenAction((preVal) => !preVal);
  }

  const actionContainer = (eachItems:TransactionData) => {
    return (
      <div className="bg-white px-2  rounded-2xl self-start dark:bg-black">
        <button
          className="mr-2 text-green-500"
          onClick={() => mainStore.handelOpenModal("isEdit", eachItems)}
        >
          <FaPencilAlt />
        </button>
        <button
          className="text-red-500"
          onClick={() => mainStore.handelOpenModal("isDelete", eachItems.id)}
        >
          <MdDelete />
        </button>
      </div>
    );
  };

  return (
    <li key={eachItems.id} className={mobileListsStyle}>
      <p className="flex gap-2 self-end">
        {isOpenAction ? actionContainer(eachItems) : ""}
        <button onClick={handelAction}>...</button>
      </p>
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <p>{eachItems.name}</p>
          <p>{eachItems.type}</p>
        </div>
        <div className="flex justify-between">
          <p>{dayjs(eachItems.date).format(DATA_FORMAT)}</p>
          <p
            className={
              eachItems.type === TYPE_OF_TRANSACTION_CREDIT
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {eachItems.type === TYPE_OF_TRANSACTION_CREDIT ? "+" : "-"}$
            {eachItems.amount}
          </p>
        </div>
      </div>
    </li>
  );
})

export default MobileDetailsList
