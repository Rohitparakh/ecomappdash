export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const MODIFY_USER_SUCCESS = "MODIFY_USER_SUCCESS";

const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: user
});

// fetch all users

export const fetchUser = user => {
  return dispatch => {
    dispatch(fetchUserSuccess(user));
  };
};


const editUserSuccess = user => ({
  type: MODIFY_USER_SUCCESS,
  payload: user
});

//TODO
export const editUser = (newUserData) => {
  return dispatch => {
    dispatch(editUserSuccess(newUserData))
  }
}



