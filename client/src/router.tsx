import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegionDetails from "./pages/RegionDetails";
import DepartmentDetails from "./pages/DepartmentDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/region/:id",
    element: <RegionDetails />,
  },
  {
    path: "/departement/:id",
    element: <DepartmentDetails />,
  },
  {
    path: "*",
    element: <div>404</div>,
  }
]);

export default router;
