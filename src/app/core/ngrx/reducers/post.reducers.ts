import { PostActions } from 'app/core/ngrx/actions/post.actions';

import ACTION_TYPES from 'app/core/ngrx/actions/action-types';
import updateState from './utility';

// CURRENT POST
export function currentPostReducer(state = {}, action: PostActions) {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_POST:
      return updateState(state, action.payload);

    case ACTION_TYPES.EDIT_CURRENT_POST:
      return updateState(state, action.payload);

    default:
      return state;
  }
}
