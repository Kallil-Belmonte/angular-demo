import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

import * as Helpers from 'app/shared/helpers';
import * as BlogActions from 'app/core/ngrx/actions/blog.actions';
import { AppState } from 'app/core/ngrx/reducers/store';
import { CategoryModel } from 'app/pages/news/_models/category.model';
import { PostModel } from 'app/pages/news/_models/post.model';
import { NewsService } from 'app/pages/news/news.service';

const { keys, values } = Object;
const { groupArrayItemsInArrays } = Helpers;
const { SetCategories, SetPosts } = BlogActions;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  isLoading: boolean = false;
  faNewspaper = faNewspaper;
  pages: object = {};
  categories: CategoryModel[] = [];
  posts: PostModel[] = [];
  pagesKeys: string[] = [];
  postsPerPage: number = 9;
  firstPaginationItem: number = 1;
  maxPaginationItem: number = 5;
  currentPage: number = 1;

  constructor(private store: Store<AppState>, private newsService: NewsService) {}

  ngOnInit() {
    this.getAllData();
  }

  //==============================
  // METHODS
  //==============================

  setPaginationSettings(posts: PostModel[], quantPostsPerPage: number = 9): void {
    const pages = {};

    groupArrayItemsInArrays(posts, quantPostsPerPage).forEach((item, index) => {
      pages[index + 1] = item;
    });

    this.pages = pages;
    this.pagesKeys = keys(pages);
    this.postsPerPage = quantPostsPerPage;
    this.firstPaginationItem = 1;
    this.maxPaginationItem = 5;
    this.currentPage = 1;
  }

  getAllData(): void {
    this.store.pipe(select((state: AppState) => state)).subscribe(state => {
      const categories: CategoryModel[] = values(state.categories);
      const posts: PostModel[] = values(state.posts);

      if (categories.length) {
        this.categories = categories;
      } else {
        this.isLoading = true;

        this.newsService.getCategories().subscribe(
          data => {
            this.categories = data;
            this.store.dispatch(new SetCategories(data));
            this.isLoading = false;
          },
          error => {
            console.error(error);
            this.isLoading = false;
          },
        );
      }

      if (posts.length) {
        this.posts = posts;
        this.setPaginationSettings(posts);
      } else {
        this.isLoading = true;

        this.newsService.getPosts().subscribe(
          data => {
            this.posts = data;
            this.setPaginationSettings(data);
            this.store.dispatch(new SetPosts(data));
            this.isLoading = false;
          },
          error => {
            console.error(error);
            this.isLoading = false;
          },
        );
      }
    });
  }

  onSelectCategory(/* category */): void {
    this.isLoading = true;

    this.newsService.getPosts().subscribe(
      data => {
        this.setPaginationSettings(data);
        this.store.dispatch(new SetPosts(data));
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      },
    );
  }

  onPaginate(target: any): void {
    switch (target) {
      case 'previous':
        this.firstPaginationItem = --this.firstPaginationItem;
        break;

      case 'next':
        this.firstPaginationItem = ++this.firstPaginationItem;
        break;

      default:
        this.currentPage = Number(target);
    }
  }
}
