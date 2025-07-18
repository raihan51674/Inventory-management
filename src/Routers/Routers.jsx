import {
  createBrowserRouter,
} from "react-router";
import AddMobile from "../Pages/AddMobile";

import AddSalePage from "../Pages/AddSalePage";
import AllRecipt from "../Pages/AllRecipt";
import Dashboard from "../Pages/Dashboard";
import InventDetails from "../Pages/InventDetails";
import Inventory from "../Pages/Inventory";
import InventUpdate from "../Pages/InventUpdate";
import Purchase from "../Pages/Purchase";
import ReportPage from "../Pages/ReportPage";
import UserInfo from "../Pages/UserInfo";
import UserInfoUpdate from "../Pages/UserInfoUpdate";
import RootHome from "../RootLayout/RootHome";
export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootHome,
    children:[
      {index:true, path:"/", Component: Dashboard},
      {path:"/AddMobile", Component:AddMobile},
     
      {path:"/AddSalePage", Component:AddSalePage},
      {path: "/Dashboard", Component:Dashboard},
      {path:"/inventory", Component:Inventory},



      {path:"/mobiles/details/:id",
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_BASE_URL}/mobiles/${params.id}`),
        Component:InventDetails},



      {path:"/mobiles/update/:id",Component:InventUpdate},



      {path:"/userInfo", Component:UserInfo},
      {
        path:"/update-sale/:id",
        loader :({params})=> fetch(`${import.meta.env.VITE_API_BASE_URL}/sales/${params.id}`),
        Component:UserInfoUpdate
      },
      {path:"/purchase", Component:Purchase},
      {path: "/all-recipt", Component:AllRecipt},
      {path:"/ReportPage", Component:ReportPage},
    ]
  },
]);