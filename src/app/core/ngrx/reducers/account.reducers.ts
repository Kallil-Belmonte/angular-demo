import { AccountActions } from 'app/core/ngrx/actions/account.actions';

import ACTION_TYPES from 'app/core/ngrx/actions/action-types';
import updateState from './utility';

// USER DATA
export function userDataReducer(state = {}, action: AccountActions) {
  switch (action.type) {
    case ACTION_TYPES.SET_USER_DATA:
      return updateState(state, action.payload);

    case ACTION_TYPES.EDIT_USER_DATA:
      return updateState(state, action.payload);

    default:
      return state;
  }
}
