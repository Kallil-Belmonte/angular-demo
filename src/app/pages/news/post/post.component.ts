import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store, select } from '@ngrx/store';

import * as PostActions from 'app/core/ngrx/actions/post.actions';
import { AppState } from 'app/core/ngrx/reducers/store';
import { ThemeFunctions } from 'app/shared/helpers/theme-functions';
import { PostModel } from 'app/pages/news/_models/post.model';
import { NewsService } from 'app/pages/news/news.service';

const { SetCurrentPost } = PostActions;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [],
})
export class PostComponent implements OnInit {
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  currentPost: PostModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private newsService: NewsService,
  ) {}

  ngOnInit() {
    this.parameterListener();
  }

  //==============================
  // METHODS
  //==============================

  getCurrentPost(id: string): void {
    this.newsService.getCurrentPost(id).subscribe(
      data => {
        this.store.dispatch(new SetCurrentPost(data));

        this.store.pipe(select((state: AppState) => state)).subscribe(({ currentPost }) => {
          this.currentPost = currentPost;
        });

        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      },
    );
  }

  parameterListener(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      // Get Current Post
      this.getCurrentPost(params['id']);
    });
  }

  onToggleModal(): void {
    // Toggle styles
    ThemeFunctions.toggleModalStyles(this.isModalOpen);

    // Toggle modal
    this.isModalOpen = !this.isModalOpen;
  }
}
