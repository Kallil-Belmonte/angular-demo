import { Action } from '@ngrx/store';

import ACTION_TYPES from 'app/core/redux/actions/action-types';
import { PostModel } from 'app/news/_models/post.model';

// SET CURRENT POST
export class SetCurrentPost implements Action {
  readonly type = ACTION_TYPES.SET_CURRENT_POST;

  constructor(public payload: PostModel) { }
}


// EDIT CURRENT POST
export class EditCurrentPost implements Action {
  readonly type = ACTION_TYPES.EDIT_CURRENT_POST;

  constructor(public payload: PostModel) { }
}

export type PostActions = SetCurrentPost | EditCurrentPost;
