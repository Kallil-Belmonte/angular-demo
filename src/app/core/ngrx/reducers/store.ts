import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { UserModel } from 'app/pages/account/_models/user.model';
import { CategoryModel } from 'app/pages/news/_models/category.model';
import { PostModel } from 'app/pages/news/_models/post.model';
import { userDataReducer } from 'app/core/ngrx/reducers/account.reducers';
import { categoriesReducer, postsReducer } from 'app/core/ngrx/reducers/blog.reducers';
import { currentPostReducer } from 'app/core/ngrx/reducers/post.reducers';

const { keys } = Object;

export interface AppState {
  userData: UserModel,
  categories: CategoryModel[],
  posts: PostModel[],
  currentPost: PostModel,
};

export const Reducers: ActionReducerMap<AppState> = {
  userData:    userDataReducer,
  categories:  categoriesReducer,
  posts:       postsReducer,
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
