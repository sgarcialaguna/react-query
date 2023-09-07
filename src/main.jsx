import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import UserList from "./UserList.jsx";
import UserDetail from "./UserDetail.jsx";
import { worker } from "./mocks/browser.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddUser from "./AddUser.jsx";

const queryClient = new QueryClient();
worker.start();

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/:id",
    element: <UserDetail />,
  },
  {
    path: "/addUser",
    element: <AddUser />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
