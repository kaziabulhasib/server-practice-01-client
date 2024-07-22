import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Users from "./components/Users.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDetails from "./components/UserDetails.jsx";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import UpdateUser from "./components/UpdateUser.jsx";
// import Pagination from "./pagination/Pagination.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // element: <Pagination />,
  },
  {
    path: "/users",
    element: <Users />,
    loader: () => fetch("http://localhost:8000/users"),
  },
  {
    path: "/users/:id",
    element: <UserDetails />,
    loader: ({ params }) => fetch(`http://localhost:8000/users/${params.id}`),
  },
  {
    path: "/update/:id",
    element: <UpdateUser />,
    loader: ({ params }) => fetch(`http://localhost:8000/users/${params.id}`),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <ToastContainer />
    </RouterProvider>
  </React.StrictMode>
);
