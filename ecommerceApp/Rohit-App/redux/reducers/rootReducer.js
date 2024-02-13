import allGroceriesReducer from './allGroceriesReducer'
import allOrdersReducer from './allOrdersReducer'
import offerGroceriesReducer from './offerGroceriesReducer'
import categoriesReducer from './categoriesReducer'
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  allGroceriesData: allGroceriesReducer,
  offerGroceriesData: offerGroceriesReducer,
  categoriesData: categoriesReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  userData: userReducer,
  allOrdersData:allOrdersReducer
});

export default rootReducer;
