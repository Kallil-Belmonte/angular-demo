import { Action } from '@ngrx/store';

import ACTION_TYPES from 'app/core/ngrx/actions/action-types';
import { UserModel } from 'app/pages/account/_models/user.model';

const { SET_USER_DATA, EDIT_USER_DATA } = ACTION_TYPES;

// SET USER DATA
export class SetUserData implements Action {
  readonly type = SET_USER_DATA;

  constructor(public payload: UserModel) { }
}


// EDIT USER DATA
export class EditUserData implements Action {
  readonly type = EDIT_USER_DATA;

  constructor(public payload: UserModel) { }
}

export type AccountActions = SetUserData | EditUserData;
