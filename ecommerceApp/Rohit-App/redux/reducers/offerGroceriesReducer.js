import { FETCH_OFFER_GROCERIES_SUCCESS } from "../actions/offerGroceriesActions";
const initState = {
  offerGroceries: []
};

const offerGroceriesReducer = (state = initState, action) => {
  if (action.type === FETCH_OFFER_GROCERIES_SUCCESS) { 
      return {
      ...state,
      offerGroceries: action.payload
    }
  }
  return state;

}

export default offerGroceriesReducer;
