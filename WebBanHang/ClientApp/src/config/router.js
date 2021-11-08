import User from "../pages/Admin/User";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";

export const adminRouter = [
  {
    path: "/admin/user",
    exact: true,
    Component: User,
  },
  {
    path: "/admin",
    exact: true,
    Component: Dashboard,
  },
  {
    path: "/admin/products",
    exact: true,
    Component: Products,
  },
];
