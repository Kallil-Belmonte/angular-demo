import { AccountActions } from 'app/core/ngrx/actions/account.actions';
import ACTION_TYPES from 'app/core/ngrx/actions/action-types';
import updateState from './utility';

const { SET_USER_DATA, EDIT_USER_DATA } = ACTION_TYPES;

// USER DATA
export function userDataReducer(state = {}, action: AccountActions) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_DATA:
      return updateState(state, payload);

    case EDIT_USER_DATA:
      return updateState(state, payload);

    default:
      return state;
  }
}
