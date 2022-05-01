import User from "../pages/Admin/User";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import ProductDetail from "../pages/Admin/ProductDetail";
import LoginPage from "../pages/Admin/Login";
import UserDetail from "../pages/Admin/UserDetail";
import EditProduct from "../pages/Admin/ProductEdit";
import Bill from "../pages/Admin/Bill";
import News from "../pages/Admin/News"
import Home from "../pages/Main/Home";
import Cart from "../pages/Main/Cart";
import ListProducts from "../pages/Main/ListProducts";
import MainProductDetail from "../pages/Main/ProductDetail";
import Profile from "../pages/Main/Profile"


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

export const mainRouter = [
    {
        path: "/",
        exact: true,
        Component: Home,
    },
    {
        path: "/cart",
        exact: false,
        Component: Cart,
    },
    {
        path: "/listproducts",
        exact: false,
        Component: ListProducts
    },
    {
        path: "/list-products&categoryid=:id&tendanhmuc=:tenDanhMuc",
        exact: false,
        Component: ListProducts
    },
    {
        path: "/product-detail&product-id=:id",
        exact: false,
        Component: MainProductDetail
    },
    {
        path: "/profile&userid=:id",
        exact: false,
        Component: Profile
    }
    
]

    
