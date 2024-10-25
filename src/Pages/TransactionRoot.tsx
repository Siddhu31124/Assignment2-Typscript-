import { Outlet } from "react-router";

import TransactionHeader from "../Components/TransactionHeader";

export default function TransactionRootPage() {
  return (
    <div className="flex flex-col">
      <TransactionHeader />
      <Outlet />
    </div>
  );
}