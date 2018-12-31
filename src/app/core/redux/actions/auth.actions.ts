import { Action } from '@ngrx/store';

import ACTION_TYPES from 'app/core/redux/actions/action-types';
import { LoginModel } from 'app/auth/_models/login.model';

// LOG IN
export class LogIn implements Action {
  readonly type = ACTION_TYPES.LOG_IN;

  constructor(public payload: LoginModel) { }
}


// LOG OUT
export class LogOut implements Action {
  readonly type = ACTION_TYPES.LOG_OUT;

  constructor(public payload) { }
}

export type AuthActions = LogIn | LogOut;
