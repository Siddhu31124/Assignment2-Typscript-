import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { QueryCache } from "@tanstack/react-query";
import {
  ALL_TRANSACTION_API,
  CONTENT_TYPE,
  ROLE,
  LOCAL_TOKEN,
  SECRETE_KEY,
  TOTAL_TRANSACTION_API,
  DELETE_TRANSACTION_API,
  ADD_TRANSACTION_API,
  UPDATE_TRANSACTION_API,
  LOGIN_API,
  LOCAL_ADMIN,
  PROFILE_API,
} from "./Constants.js";
import { LoginData, AddTransactionData } from "./Types/CommonTypes.js";

export const queryClient = new QueryClient();
export const queryCache = new QueryCache();

export const fetchAllTransaction = async () => {
  const localToken = localStorage.getItem(LOCAL_TOKEN);
  const token_id: number = localToken ? JSON.parse(localToken) : undefined;

  const res = await axios({
    method: "get",
    baseURL: ALL_TRANSACTION_API,
    headers: {
      "Content-Type": CONTENT_TYPE,
      "x-hasura-admin-secret": SECRETE_KEY,
      "x-hasura-role": ROLE,
      "x-hasura-user-id": token_id,
    },
  });
  return res.data;
};

export async function fetchLastTransaction() {
  const localToken = localStorage.getItem(LOCAL_TOKEN);
  const token_id: number = localToken ? JSON.parse(localToken) : undefined;
  const res = await axios({
    method: "get",
    params: {
      limit: 3,
      offset: 0,
    },
    baseURL: ALL_TRANSACTION_API,
    headers: {
      "Content-Type": CONTENT_TYPE,
      "x-hasura-admin-secret": SECRETE_KEY,
      "x-hasura-role": ROLE,
      "x-hasura-user-id": token_id,
    },
  });
  console.log(res.data);

  return res.data;
}

export async function fetchTotalTransaction() {
  const localToken = localStorage.getItem(LOCAL_TOKEN);
  const token_id: number = localToken ? JSON.parse(localToken) : undefined;
  const res = await axios({
    method: "get",
    baseURL: TOTAL_TRANSACTION_API,
    headers: {
      "Content-Type": CONTENT_TYPE,
      "x-hasura-admin-secret": SECRETE_KEY,
      "x-hasura-role": ROLE,
      "x-hasura-user-id": token_id,
    },
  });
  return res.data;
}

export const handleTransactionDelete = async ({ id }: { id: string }) => {
  const localToken = localStorage.getItem(LOCAL_TOKEN);
  const token_id: number = localToken ? JSON.parse(localToken) : undefined;

  const url = DELETE_TRANSACTION_API + id;
  const res = await axios.delete(url, {
    headers: {
      "Content-Type": CONTENT_TYPE,
      "x-hasura-admin-secret": SECRETE_KEY,
      "x-hasura-role": ROLE,
      "x-hasura-user-id": token_id,
    },
  });
  return res.data;
};

export async function handelAddTransaction({
  data,
}: {
  data: AddTransactionData;
}) {
  const localToken = localStorage.getItem(LOCAL_TOKEN);
  const token_id: number = localToken ? JSON.parse(localToken) : undefined;
  const url = ADD_TRANSACTION_API;
  const res = await axios.post(
    url,
    { ...data, user_id: token_id },
    {
      headers: {
        "Content-Type": CONTENT_TYPE,
        "x-hasura-admin-secret": SECRETE_KEY,
        "x-hasura-role": ROLE,
        "x-hasura-user-id": token_id,
      },
    }
  );
  return res.data;
}

export async function handelEditTransaction({
  data,
  id,
}: {
  data: AddTransactionData;
  id: number;
}) {
  const localToken = localStorage.getItem(LOCAL_TOKEN);
  const token_id: number = localToken ? JSON.parse(localToken) : undefined;
  const url = UPDATE_TRANSACTION_API;
  const res = await axios.post(
    url,
    { ...data, id: id },
    {
      headers: {
        "Content-Type": CONTENT_TYPE,
        "x-hasura-admin-secret": SECRETE_KEY,
        "x-hasura-role": ROLE,
        "x-hasura-user-id": token_id,
      },
    }
  );
  return res.data;
}

export async function handelLogin({
  data,
  admin,
}: {
  data: LoginData;
  admin: boolean;
}) {
  const url = LOGIN_API;
  const res = await axios.post(url, data, {
    headers: {
      "x-hasura-admin-secret": SECRETE_KEY,
    },
  });
  if (res.status === 200) {
    localStorage.setItem(
      LOCAL_TOKEN,
      JSON.stringify(res.data.get_user_id[0].id)
    );
    if (admin) {
      localStorage.setItem(LOCAL_ADMIN, JSON.stringify(admin));
    }
    return "Successful";
  }
}

export const fetchUserProfile = async () => {
  const localToken = localStorage.getItem(LOCAL_TOKEN);
  const token_id: number = localToken ? JSON.parse(localToken) : undefined;
  const url = PROFILE_API;
  const res = await axios.get(url, {
    headers: {
      "Content-Type": CONTENT_TYPE,
      "x-hasura-admin-secret": SECRETE_KEY,
      "x-hasura-role": ROLE,
      "x-hasura-user-id": token_id,
    },
  });
  return res.data.users[0];
};
