import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Auth from "./auth/reducer"
import User from "./user/reducer"
import Roles from "./roles-permissions/reducer"
import Stores from "./pos/reducer"
import CustomFields from "./customFields/reducer";
import Families from "./categories-families/reducer"
import Brands from "./brand/reducer"
import StoreGroups from "./storeGroup/reducer"
import PlannigDailys from "./plannigDaily/reducer"
import Products from "./product/reducer"
import Display from "./display/reducer"
import Orders from "./order/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Auth,
  PlannigDailys,
  User,
  Roles,
  Stores,
  CustomFields,
  Families,
  Brands,
  StoreGroups,
  Products,
  Display,
  Orders
})

export default rootReducer
