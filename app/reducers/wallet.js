import {VERIFIED_WALLET} from '../actions/wallet';

export default function wallet(state = {}, action) {
  switch (action.type) {
    case VERIFIED_WALLET:
      return action.account;
    default:
      return state;
  }
}
