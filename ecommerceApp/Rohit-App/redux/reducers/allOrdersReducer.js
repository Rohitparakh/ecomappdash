import { FETCH_ORDERS_SUCCESS } from "../actions/allOrdersActions";

const initState = {
 allOrders: []
};

const allOrdersReducer = (state = initState, action) => {
  if (action.type === FETCH_ORDERS_SUCCESS) {
    return {
      ...state,
 allOrders: action.payload
    };
  }
  return state;
};

export default allOrdersReducer;
