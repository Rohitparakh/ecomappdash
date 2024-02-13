import { FETCH_USER_SUCCESS, MODIFY_USER_SUCCESS } from "../actions/userActions";

const initState = {
 user: []
};

const userReducer = (state = initState, action) => {
  if (action.type === FETCH_USER_SUCCESS) {
    return {
      ...state,
 user: action.payload
    };
  }
  if(action.type === MODIFY_USER_SUCCESS){
    return{
      ...state,
      user:action.payload
    }
  }
  return state;
};

export default userReducer;
