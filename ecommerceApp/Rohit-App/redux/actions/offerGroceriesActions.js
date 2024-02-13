export const FETCH_OFFER_GROCERIES_SUCCESS = "FETCH_OFFER_GROCERIES_SUCCESS";

const fetchOfferGroceriesSuccess = offerGroceries => ({
  type: FETCH_OFFER_GROCERIES_SUCCESS,
  payload: offerGroceries
});

// fetch offer groceries
export const fetchOfferGroceries = offerGroceries => {
  return dispatch => {
    dispatch(fetchOfferGroceriesSuccess(offerGroceries));
  };
};

