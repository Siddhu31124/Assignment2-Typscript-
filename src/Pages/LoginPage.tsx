import { observer } from "mobx-react";
import Login from "../Components/Login";
import mainStore from "../Store/MainStore";

const LoginPage= observer( ()=> {
  return (
    <div className={mainStore.isDarkMode ? "dark" : ""}>
      <div className="dark:bg-black">
        <Login />
      </div>
    </div>
  );
})

export default LoginPage