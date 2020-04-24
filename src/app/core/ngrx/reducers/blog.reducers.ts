import { BlogActions } from 'app/core/ngrx/actions/blog.actions';

import ACTION_TYPES from 'app/core/ngrx/actions/action-types';
import updateState from './utility';

const { SET_CATEGORIES, SET_POSTS } = ACTION_TYPES;

// BLOG
export function categoriesReducer(state = {}, action: BlogActions) {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORIES:
      return updateState(state, payload);

    default:
      return state;
  }
}

// BLOG
export function postsReducer(state = {}, action: BlogActions) {
  const { type, payload } = action;

  switch (type) {
    case SET_POSTS:
      return updateState(state, payload);

    default:
      return state;
  }
}
