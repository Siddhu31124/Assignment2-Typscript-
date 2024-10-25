import { observer } from "mobx-react";

import { Outlet, Navigate } from "react-router-dom";
import { LOCAL_TOKEN, LOGIN_ROUTE } from "../Constants";
import Sidebar from "../Components/Sidebar.tsx";
import mainStore from "../Store/ModalStore.tsx";

const RootPage=observer(()=> {
  const token = localStorage.getItem(LOCAL_TOKEN);
  const id  = token ? JSON.parse(token) : null;
  const onSuccess = () => {
    return (
      <div className={mainStore.isDarkMode ? "flex dark" : "flex"}>
        <Sidebar />
        <Outlet />
      </div>
    );
  };

  if (id) {
    return onSuccess();
  }
  return <Navigate to={LOGIN_ROUTE} replace />;}
)
export default RootPage
