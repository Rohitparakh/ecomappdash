export const FETCH_GROCERIES_SUCCESS = "FETCH_GROCERIES_SUCCESS";

const fetchAllGroceriesSuccess = allGroceries => ({
  type: FETCH_GROCERIES_SUCCESS,
  payload: allGroceries
});

// fetch all groceries
export const fetchAllGroceries = allGroceries => {
  return dispatch => {
    dispatch(fetchAllGroceriesSuccess(allGroceries));
  };
};


