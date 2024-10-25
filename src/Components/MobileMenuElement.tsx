import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLightMode } from "react-icons/md";
import { observer } from "mobx-react";

import { INITIAL_ROUTE, TRANSACTION_ROUTE } from "../Constants";
import { mobileMenuStyle, mobileAddButton } from "../utils/Styles";
import mainStore from "../Store/MainStore";

const MobileNavBar = observer( () => {

  function handelLogoutMenu() {
    mainStore.handelOpenMenu();
    mainStore.handelOpenModal("isLogout");
  }

  const menuElements = () => {
    if (mainStore.isOpenMenu) {
      return (
        <div className=" p-6 absolute bg-slate-100 w-screen top-16 dark:bg-black">
          <ul className="menu flex flex-col gap-4 ">
            <NavLink to={INITIAL_ROUTE} end>
              <li onClick={mainStore.handelOpenMenu}>Dashboard</li>
            </NavLink>
            <NavLink to={TRANSACTION_ROUTE} end>
              <li onClick={mainStore.handelOpenMenu}>All Transaction</li>
            </NavLink>
            <li className="cursor-pointer" onClick={handelLogoutMenu}>
              Logout
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col dark:bg-black dark:text-white">
      <div className={mobileMenuStyle}>
        <div className="flex gap-4">
          <RxHamburgerMenu
            className="text-black text-2xl dark:text-white cursor-pointer"
            onClick={mainStore.handelOpenMenu}
          />
          <img src="Logo.png" />
        </div>
        <p className="flex gap-2 items-center">
          <button
            onClick={() => mainStore.handelOpenModal("isAdd")}
            className={mobileAddButton}
          >
            ADD
          </button>
          <button className="text-2xl" onClick={mainStore.handelDarkMode}>
            <MdOutlineLightMode />
          </button>
        </p>
      </div>
      {menuElements()}
    </div>
  );
});

export default MobileNavBar;
