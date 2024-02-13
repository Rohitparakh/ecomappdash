import { FETCH_GROCERIES_SUCCESS } from "../actions/allGroceriesActions";

const initState = {
 allGroceries: []
};

const allGroceriesReducer = (state = initState, action) => {
  if (action.type === FETCH_GROCERIES_SUCCESS) {
    return {
      ...state,
 allGroceries: action.payload
    };
  }
  return state;
};

export default allGroceriesReducer;
