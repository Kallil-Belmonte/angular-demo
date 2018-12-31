import { AuthActions } from 'app/core/redux/actions/auth.actions';

import ACTION_TYPES from 'app/core/redux/actions/action-types';
import updateState from './utility';

export function authReducer(state = {}, action: AuthActions) {
  switch (action.type) {
    case ACTION_TYPES.LOG_IN:
      return updateState(state, action.payload);

    case ACTION_TYPES.LOG_OUT:
      return action.payload;

    default:
      return state;
  }
}
