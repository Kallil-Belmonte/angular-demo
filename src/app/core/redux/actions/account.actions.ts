import { Action } from '@ngrx/store';

import ACTION_TYPES from 'app/core/redux/actions/action-types';
import { UserModel } from 'app/account/_models/user.model';

// SET USER DATA
export class SetUserData implements Action {
  readonly type = ACTION_TYPES.SET_USER_DATA;

  constructor(public payload: UserModel) { }
}


// EDIT USER DATA
export class EditUserData implements Action {
  readonly type = ACTION_TYPES.EDIT_USER_DATA;

  constructor(public payload: UserModel) { }
}

export type AccountActions = SetUserData | EditUserData;
