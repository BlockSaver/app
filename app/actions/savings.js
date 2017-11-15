import * as Neon from "neon-js";

import {executeTransaction, str2hex} from "../helpers";
import {scriptHash} from "../config";


export const CREATE_NEW_SAVINGS = "CREATE_NEW_SAVINGS";
export function createNewSavings(data, wif) {
  return function(dispatch) {
    const name = str2hex(data.name);
    const endTime = data.endTime.unix();
    const account = Neon.getAccountFromWIFKey(wif);
    const args = [name, endTime];
    const invoke = { operation: 'createSavings', scriptHash , args};
    const gasCost = 0;

    executeTransaction(account, invoke, gasCost).then(response => {
      if (response.result) {
        dispatch({type: CREATE_NEW_SAVINGS, data: response});
      } else {
        alert("Something went wrong.");
      }
    });
  };
}
