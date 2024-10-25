import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import { handelLogin } from "../http";
import Input from "./CommonComponents/Input";
import Loader from "./CommonComponents/Loader";
import {
  INITIAL_ROUTE,
  LOCAL_TOKEN,
  LOGIN_ROUTE,
  LOGIN_ERROR,
  ADMIN_LOGIN_ROUTE,
} from "../Constants";
import { loginFormStyle, loginInputStyle } from "../utils/Styles";

const Login = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: handelLogin,
    onSuccess: () => {
      navigate(INITIAL_ROUTE);
    },
  });

  let isAdmin = location.pathname === ADMIN_LOGIN_ROUTE;
  let isUserIdPresent = localStorage.getItem(LOCAL_TOKEN);
  let user_Id: boolean = isUserIdPresent
    ? JSON.parse(isUserIdPresent)
    : undefined;

  function loginFunction(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    let data = new FormData(event.target as HTMLFormElement);
    let loginData: { email: string; password: string } = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    mutate({ data: loginData, admin: isAdmin });
  }

  let errorContent = () => {
    if (isError) {
      return <p className="text-red-600 mb-2">{LOGIN_ERROR}</p>;
    }
  };

  const loginForm = () => {
    switch (true) {
      case user_Id: {
        return <Navigate to={INITIAL_ROUTE} replace />;
      }

      case isPending: {
        return (
          <div className="loader">
            <Loader />
          </div>
        );
      }

      default: {
        return (
          <div className={loginFormStyle}>
            <h1 className="text-4xl ml-30 mb-6 text-black dark:text-white">
              Login
            </h1>
            <form onSubmit={loginFunction}>
              <div className="mb-6">
                <Input
                  label_name="Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={loginInputStyle}
                  required
                />
              </div>
              <div className="mb-6">
                <Input
                  label_name="Password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Transaction Name"
                  className={loginInputStyle}
                  required
                />
              </div>
              {errorContent()}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
            <Link to={isAdmin ? LOGIN_ROUTE : ADMIN_LOGIN_ROUTE}>
              <p className="mt-2">
                Login as
                <span className="text-blue-500">
                  {isAdmin ? " User" : " Admin"} ?
                </span>
              </p>
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <div className="h-screen flex flex-row justify-center items-center">
      {loginForm()}
    </div>
  );
});

export default Login;
