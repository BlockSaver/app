import { CREATE_NEW_SAVINGS } from '../actions/savings';

export default function savings(state = {}, action) {
  switch (action.type) {
    case CREATE_NEW_SAVINGS:
      return action.data;
    default:
      return state;
  }
}
