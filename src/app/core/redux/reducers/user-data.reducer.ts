import { UserDataActions } from 'app/core/redux/actions/user-data.actions';

import ACTION_TYPES from 'app/core/redux/actions/action-types';
import updateState from './utility';

export function userDataReducer(state = {}, action: UserDataActions) {
  switch (action.type) {
    case ACTION_TYPES.SET_USER_DATA:
      return updateState(state, action.payload);

    case ACTION_TYPES.EDIT_USER_DATA:
      return updateState(state, action.payload);

    default:
      return state;
  }
}
