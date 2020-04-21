import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { userDataReducer } from 'app/core/ngrx/reducers/account.reducers';
import { currentPostReducer } from 'app/core/ngrx/reducers/post.reducers';

export const Reducers: ActionReducerMap<any> = {
  userData:    userDataReducer,
  currentPost: currentPostReducer,
};

// LOCAL STORAGE SYNC REDUCER
export const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> => localStorageSync({
  keys: Object.keys(Reducers),
  rehydrate: true,
})(reducer);
