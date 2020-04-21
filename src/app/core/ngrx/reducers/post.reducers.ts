import { PostActions } from 'app/core/ngrx/actions/post.actions';

import ACTION_TYPES from 'app/core/ngrx/actions/action-types';
import updateState from './utility';

const { SET_CURRENT_POST, EDIT_CURRENT_POST } = ACTION_TYPES;

// CURRENT POST
export function currentPostReducer(state = {}, action: PostActions) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_POST:
      return updateState(state, payload);

    case EDIT_CURRENT_POST:
      return updateState(state, payload);

    default:
      return state;
  }
}
