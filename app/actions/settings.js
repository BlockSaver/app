import fetch from 'isomorphic-fetch';

const apiURL = "";

export const SAVE_CARD_DETAILS = "SAVE_CARD_DETAILS";
function saveCardDetails(data) {
  return {
    type: SAVE_CARD_DETAILS,
    data
  }
}

export function postCardDetails(data) {
  return function (dispatch) {
    dispatch(saveCardDetails(data));
  }
}
