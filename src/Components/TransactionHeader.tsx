import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";

import AddModal from "./AddModal";
import { TRANSACTION_ROUTE, CREDIT_ROUTE, DEBIT_ROUTE } from "../Constants";
import MobileNavBar from "./MobileMenuElement";
import MobileTransaction from "./MobileTransactionBar";
import { addButtonTransactionStyle, navBarStyle } from "../utils/Styles";
import mainStore from "../Store/ModalStore";

const TransactionHeader = observer(() => {

  const isActivePathStyle = ({ isActive }: { isActive: boolean }) => (isActive ? "text-blue-500" : "");

  const navbarElements = () => {
    return (
      <div>
        <h3 className="text-2xl font-bold">Transactions</h3>
        <ul className="flex gap-6 mt-1">
          <NavLink to={TRANSACTION_ROUTE} end className={isActivePathStyle}>
            <li>All Transaction</li>
          </NavLink>
          <NavLink to={CREDIT_ROUTE} className={isActivePathStyle}>
            <li>Credit</li>
          </NavLink>
          <NavLink to={DEBIT_ROUTE} className={isActivePathStyle}>
            <li>Debit</li>
          </NavLink>
        </ul>
      </div>
    );
  };

  return (
    <>
      <AddModal />
      <MobileNavBar />
      <MobileTransaction />
      <nav
        className={`${navBarStyle} hidden w-[83vw] lg:flex dark:bg-black dark:text-white`}
      >
        {navbarElements()}
        <p className="flex gap-6">
          <button
            className={addButtonTransactionStyle}
            onClick={() => mainStore.handelOpenModal("isAdd")}
          >
            + Add Transactions
          </button>
          <button className="text-2xl" onClick={mainStore.handelDarkMode}>
            <MdOutlineLightMode />
          </button>
        </p>
      </nav>
    </>
  );
});

export default TransactionHeader;