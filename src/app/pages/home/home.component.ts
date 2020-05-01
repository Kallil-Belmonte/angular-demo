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
  styleUrls: []
})
export class HomeComponent implements OnInit {

  isLoading: boolean = false;
  featuredPosts: PostModel[];

  constructor(private store: Store<AppState>,
              private homeService: HomeService) { }

  ngOnInit() {
    this.getFeaturedPosts();
  }

	//==============================
  // GENERAL METHODS
  //==============================

  // GET FEATURED POSTS
  getFeaturedPosts(): void {
    this.store.pipe(select((state: AppState) => state)).subscribe(
      (state) => {
        const posts: PostModel[] = values(state.posts);

        if (!posts.length) {
          this.isLoading = true;

          this.homeService.getFeaturedPosts().subscribe(
            data => {

              this.featuredPosts = [data[0], data[1], data[2]];
              this.store.dispatch(new SetPosts(data));
              this.isLoading = false;
            },
            error => {
              console.error(error);
              this.isLoading = false;
            }
          );
        } else {
          this.featuredPosts = [posts[0], posts[1], posts[2]];
        }
      }
    );
  }

}
