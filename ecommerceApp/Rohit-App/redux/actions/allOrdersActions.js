export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";

const fetchAllOrdersSuccess = allOrders => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: allOrders
});

// fetch all Orders
export const fetchAllOrders = allOrders => {
  return dispatch => {
    dispatch(fetchAllOrdersSuccess(allOrders));
  };
};


