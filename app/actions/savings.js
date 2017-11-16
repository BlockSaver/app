import * as Neon from "neon-js";

import {executeTransaction, str2hex, testInvokeRPC} from "../helpers";
import {scriptHash} from "../config";

export const CREATE_NEW_SAVINGS = "CREATE_NEW_SAVINGS";
export const FETCH_SAVINGS = "FETCH_SAVINGS";

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

export function fetchSavings(savingsName) {
  const name = str2hex(savingsName);
  const account = Neon.getAccountFromWIFKey(config.wif);
  const args = [account.publicKeyEncoded, name];
  const operation = 'getSavingsByName';
  let invoke = { operation, scriptHash, args};
  const gasCost = 1;

  testInvokeRPC(scriptHash, operation, args).then((response) => {
    if (response.result) {
      executeTransaction(account, invoke, gasCost);
    }
  });
}
