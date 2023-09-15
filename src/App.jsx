import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import UserList from "./UserList.jsx";
import UserDetail from "./UserDetail.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddUser from "./AddUser.jsx";
import EditUser from "./EditUser.jsx";
import InfiniteUserList from "./InfiniteUserList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/infinite",
    element: <InfiniteUserList />,
  },
  {
    path: "/:id",
    element: <UserDetail />,
  },
  {
    path: "/addUser",
    element: <AddUser />,
  },
  {
    path: "/:id/edit",
    element: <EditUser />,
  },
]);

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

export const TestApp = ({ testQueryClient }) => (
  <React.StrictMode>
    <QueryClientProvider client={testQueryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
