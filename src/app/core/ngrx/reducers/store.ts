import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { userDataReducer } from 'app/core/ngrx/reducers/account.reducers';
import { currentPostReducer } from 'app/core/ngrx/reducers/post.reducers';

const { keys } = Object;

export const Reducers: ActionReducerMap<any> = {
  userData:    userDataReducer,
  currentPost: currentPostReducer,
};

export const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> => localStorageSync({
  keys: keys(Reducers),
  rehydrate: true,
})(reducer);

export const clearStorageData = () => {
  sessionStorage.removeItem('authTokenAngularDemo');
  localStorage.removeItem('authTokenAngularDemo');
  localStorage.removeItem('expirationDateAngularDemo');
  keys(Reducers).forEach(reducerKey => localStorage.removeItem(reducerKey));
};
