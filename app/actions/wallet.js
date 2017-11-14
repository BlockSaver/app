import * as Neon from 'neon-js';

export const VERIFIED_WALLET = 'VERIFIED_WALLET';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';

export const WIF_LENGTH = 52;

export function loadWallet(wif) {
  return (dispatch) => {
    if (wif || wif.length !== WIF_LENGTH) {
      alert(`WIF address must have exactly ${WIF_LENGTH} characters!`);
      return;
    }
    const account = Neon.getAccountFromWIFKey(wif);
    console.log('account:', account);
    if (account) {
      const verified = Neon.verifyAddress(account.address);
      if (verified) {
        return dispatch({
          type: VERIFIED_WALLET,
          account,
        });
      }
      alert('Bad NEO address.');
    } else {
      alert('Bad key');
    }
  };
}

/* export function sendNEO(amount) {
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
}*/
