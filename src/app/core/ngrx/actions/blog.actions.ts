import { Action } from '@ngrx/store';

import ACTION_TYPES from 'app/core/ngrx/actions/action-types';
import { PostModel } from 'app/pages/news/_models/post.model';
import { CategoryModel } from 'app/pages/news/_models/category.model';

const { SET_CATEGORIES, SET_POSTS } = ACTION_TYPES;

// SET CATEGORIES
export class SetCategories implements Action {
  readonly type = SET_CATEGORIES;

  constructor(public payload: CategoryModel[]) { }
}

// SET POSTS
export class SetPosts implements Action {
  readonly type = SET_POSTS;

  constructor(public payload: PostModel[]) { }
}

export type BlogActions = SetCategories | SetPosts;
