import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { observer } from "mobx-react";

import { queryClient } from "./http";
import { routersPath } from "./utils/RoutersPages.tsx";

function App() {
  const router = routersPath();

  const AppComponent=observer(()=>(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </QueryClientProvider>
  ))
  return (
    <AppComponent/>
  );
}

export default App;
