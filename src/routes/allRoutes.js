import React from "react"
import { Redirect } from "react-router-dom"
import UserProfile from "../pages/Profile"
import Login from "../pages/Authentication/Login"
import Dashboard from "../pages/Dashboard/index"
import UsersList from "../pages/User"
import RolesPermissions from "pages/Roles-Permissions"
import NotFoundPage from "shared/NotFoundPage"
import PosList from "pages/Stores"
import BrandsList from "pages/Brand"
import CategoriesFamilies from "pages/Categories-Families"
import ProductsList from "pages/Products"
import StoreGroupeList from "pages/StoreGroup"
import Planning from "pages/Planning"
import Display from "pages/Display"
import DisplayType from "pages/DisplayTypes"
import ReferencedProducts from "pages/ReferencedProducts"
import Stockout from "pages/Stock"
import OrderList from "pages/Order"
import PlanningControl from "pages/PlanningControl"
import Notifications from "pages/Notifications"
import PlanningControlDaily from "pages/PlanningControlDaily"

const userRoutes = [
  // Dashboard route
  { path: "/dashboard", component: Dashboard },
  // user routes
  { path: "/users", component: UsersList },
  { path: "/profile", component: UserProfile },
  //settings routes
  { path: "/permissions", component: RolesPermissions },
  { path: "/categories", component: CategoriesFamilies },
  { path: "/storeGroup", component: StoreGroupeList },
  { path: "/brands", component: BrandsList },
  { path: "/displayTypes", component: DisplayType },
  // POS routes
  { path: "/stores", component: PosList },
  // Product route
  { path: "/products", component: ProductsList },
  //Planning route
  { path: "/planning", component: Planning },
  //PlanningControl route
  { path: "/planningControl", component: PlanningControl },

  { path: "/planningControlDaily", component: PlanningControlDaily },
  //Display route
  { path: "/display", component: Display },
  //ReferencedProducts route
  { path: "/referencedProducts", component: ReferencedProducts },
  //Stockout route
  { path: "/stock", component: Stockout },
  //order route
  { path: "/orders", component: OrderList },
  // Notificatons routes
  { path: "/notifications", component: Notifications },

  // standard
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { path: "/*", exact: true, component: () => <Redirect to="/404" /> },
]

const authRoutes = [
  { path: "/login", component: Login },
  { path: "/404", component: NotFoundPage },
]

export { userRoutes, authRoutes }
