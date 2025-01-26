import { createRoot } from "react-dom/client";
import "./input.css";
import { router } from "./App";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer autoClose={2000} />
    <RouterProvider router={router} />
  </>
);
