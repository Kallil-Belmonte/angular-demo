import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as BlogActions from 'app/core/ngrx/actions/blog.actions';
import { AppState } from 'app/core/ngrx/reducers/store';
import { PostModel } from 'app/pages/news/_models/post.model';
import { HomeService } from 'app/pages/home/home.service';

const { values } = Object;
const { SetPosts } = BlogActions;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  featuredPosts: PostModel[];

  constructor(private store: Store<AppState>, private homeService: HomeService) {}

  ngOnInit() {
    this.getFeaturedPosts();
  }

  //==============================
  // METHODS
  //==============================

  getFeaturedPosts(): void {
    this.store.pipe(select((state: AppState) => state)).subscribe(state => {
      const posts: PostModel[] = values(state.posts);

      if (posts.length) {
        const [firstPost, secondPost, thirdPost] = posts;
        this.featuredPosts = [firstPost, secondPost, thirdPost];
      } else {
        this.loading = true;

        this.homeService.getFeaturedPosts().subscribe(
          data => {
            const [firstPost, secondPost, thirdPost] = data;
            this.featuredPosts = [firstPost, secondPost, thirdPost];
            this.store.dispatch(new SetPosts(data));
            this.loading = false;
          },
          error => {
            console.error(error);
            this.loading = false;
          },
        );
      }
    });
  }
}
