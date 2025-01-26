import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Network } from "./Pages/Network";
import { Admin } from "./Pages/Admin";
import { createBrowserRouter } from "react-router-dom";
import { Private } from "./Routes/Private";
import { Error } from "./Pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/admin/network",
    element: (
      <Private>
        <Network />
      </Private>
    ),
  },
  {
    path:"*",
    element: <Error/>
  }
]);
