import User from "../pages/Admin/User";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import ProductDetail from "../pages/Admin/ProductDetail";
import LoginPage from "../pages/Admin/Login";
import UserDetail from "../pages/Admin/UserDetail";
import EditProduct from "../pages/Admin/ProductEdit";
import Bill from "../pages/Admin/Bill";
import News from "../pages/Admin/News"

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
  {
    path: "/admin/products/productdetail/:id",
    exact: true,
    Component: ProductDetail,
  },
  {
    path: "/admin/products/editproduct/:id",
    exact: true,
    Component: EditProduct,
  },
  {
    path: "/admin/user/userdetail/:id",
    exact: true,
    Component: UserDetail,
  },
  {
      path: "/admin/bills",
      exact: true,
      Component: Bill,
    },
    {
        path: "/admin/news",
        exact: true,
        Component: News,
    }
];


export const loginRouter = [
    {
        path: "/admin/login",
        exact: true,
        Component: LoginPage,
    },
]
    
