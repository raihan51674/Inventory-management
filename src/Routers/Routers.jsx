import {
  createBrowserRouter,
} from "react-router";
import AddMobile from "../Pages/AddMobile";
import AddPurchase from "../Pages/AddPurchase";
import AddSalePage from "../Pages/AddSalePage";
import Dashboard from "../Pages/Dashboard";
import EditMobile from "../Pages/EditMobile";
import Inventory from "../Pages/Inventory";
import Purchase from "../Pages/Purchase";
import ReportPage from "../Pages/ReportPage";
import RootHome from "../RootLayout/RootHome";
export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootHome,
    children:[
      {index:true, path:"/", Component: Dashboard},
      {path:"/AddMobile", Component:AddMobile},
      {path:"/AddPurchase", Component:AddPurchase},
      {path:"/AddSalePage", Component:AddSalePage},
      {path: "/Dashboard", Component:Dashboard},
      {path:"/EditMobile", Component:EditMobile},
      {path:"/inventory", Component:Inventory},
      {path:"/purchase", Component:Purchase},
      {path:"/ReportPage", Component:ReportPage},
    ]
  },
]);