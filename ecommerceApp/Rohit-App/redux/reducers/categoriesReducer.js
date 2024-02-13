import { FETCH_CATEGORIES_SUCCESS } from "../actions/categoriesActions";

const initState = {
  categories: []
};

const categoriesReducer = (state = initState, action) => {
  if (action.type ===  FETCH_CATEGORIES_SUCCESS) {
      return {
      ...state,
      categories: action.payload
    }
  }
  return state;

}

export default categoriesReducer;
