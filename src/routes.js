import React from "react";

import SignIn from "views/auth/SignIn";
import {
  MdHome,
  MdHealthAndSafety,
  MdStore,
  MdCategory,
  MdOutlinePedalBike,
  MdOutlineDepartureBoard
} from "react-icons/md";

import Dashboard from "views/admin/Dashboard/Dashboard";
import Partners from "views/admin/Partners/Partners";
import SaleForce from "views/admin/SaleForce/SaleForce";
import Category from "views/admin/Category/Category";
import { AiOutlinePoweroff } from "react-icons/ai";
import Subcat from "views/admin/Category/Subcat";
import Delivery from "views/admin/SaleForce/Delivery";
import AllOrders from "views/admin/AllOrders";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "Medicines", //"Partners",
    layout: "/admin",
    path: "partners",
    icon: <MdHealthAndSafety className="h-6 w-6" />,
    component: <Partners />,
  },
  {
    name: "Pharmacies", //"SaleForce
    layout: "/admin",
    path: "saleForce",
    icon: <MdStore className="h-6 w-6" />,
    component: <SaleForce />,
  },
  {
    name: "Delivery Boys", //"SaleForce
    layout: "/admin",
    path: "delivery",
    icon: <MdOutlinePedalBike className="h-6 w-6" />,
    component: <Delivery />,
  },
  {
    name: "All Orders", //"SaleForce
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineDepartureBoard className="h-6 w-6" />,
    component: <AllOrders />,
  },
  {
    name: "Catories", //"SaleForce
    layout: "/admin",
    path: "category",
    icon: <MdCategory className="h-6 w-6" />,
    component: <Category />,
  },
  {
    name: "subcat",
    layout: "/admin",
    path: "subcat",
    icon: <AiOutlinePoweroff className="h-6 w-6" />,
    component: <Subcat />,
    style: { display: "none" },
  },
  {
    name: "Logout",
    layout: "/auth",
    path: "sign-in",
    icon: <AiOutlinePoweroff className="h-6 w-6" />,
    component: <SignIn />,
  },
  // create multiple routes for sub menu
];
export default routes;