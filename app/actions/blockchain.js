import * as neo from "neo-api";
import * as Neon from "neon-js";
import {ab2hexstring} from "neon-js/src/utils";

const network = "TestNet";
export const VERIFIED_WALLET = "VERIFIED_WALLET";
export const PAYMENT_SUCCESS = "PAYMENT_SUCCESS";

export function testneo() {
  return (dispatch, getState) => {
    /*const node = neo.node('http://188.226.138.245:20333/');
    node.getBlockCount().then(function (result) {
      console.log(result);
    });*/

    const privateKey = ab2hexstring(Neon.generatePrivateKey());
    const wif = Neon.getWIFFromPrivateKey(privateKey);
    console.log("Wif:", wif);
    const account = Neon.getAccountFromWIFKey(wif);
    console.log(account);

  };
}

export function loadWallet(wif) {
  return (dispatch, getState) => {
    const account = Neon.getAccountFromWIFKey(wif);
    if (Neon.verifyAddress(account.address)) {
      return dispatch({
        type: VERIFIED_WALLET,
      });
    } else {
      alert("Bad NEO address.");
    }
  }
}

export function sendNEO(amount) {
  return (dispatch, getState) => {
    const state = getState();
    const address = state.wallet.address;
    const wif = state.wallet.address;

    Neon.doSendAsset(network, address, wif, {'NEO': amount})
      .then((response) => {
        console.log(response);
        if (response.result) {
          dispatch({
            type: PAYMENT_SUCCESS,
          });
        }
      })

      .catch((e) => {
        console.log(e);
        alert(e.message);
      })
  }
}
