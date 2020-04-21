import { Action } from '@ngrx/store';

import ACTION_TYPES from 'app/core/ngrx/actions/action-types';
import { PostModel } from 'app/news/_models/post.model';

const { SET_CURRENT_POST, EDIT_CURRENT_POST } = ACTION_TYPES;

// SET CURRENT POST
export class SetCurrentPost implements Action {
  readonly type = SET_CURRENT_POST;

  constructor(public payload: PostModel) { }
}


// EDIT CURRENT POST
export class EditCurrentPost implements Action {
  readonly type = EDIT_CURRENT_POST;

  constructor(public payload: PostModel) { }
}

export type PostActions = SetCurrentPost | EditCurrentPost;
