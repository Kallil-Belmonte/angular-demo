import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';

import * as PostActions from 'app/core/ngrx/actions/post.actions';
import { ThemeFunctions } from 'app/shared/helpers/theme-functions';
import { PostModel } from 'app/pages/news/_models/post.model';
import { NewsService } from 'app/pages/news/news.service';

type postState = {
  currentPost: PostModel,
};

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: []
})
export class PostComponent implements OnInit {

  isLoading: boolean = true;
  isModalOpen: boolean = false;
  currentPost: PostModel;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<postState>,
              private newsService: NewsService) { }

  ngOnInit() {
    this.parameterListener();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET CURRENT POST
  getCurrentPost(id: string): void {
    this.newsService.getCurrentPost(id).subscribe(
      data => {
        // Set data to reducer
        this.store.dispatch(new PostActions.SetCurrentPost(data));

        // Get Current Post from reducer
        this.store.select('currentPost').subscribe(
          (state: PostModel) => {
            this.currentPost = state;
          }
        );

        // Deactivate loader
        this.isLoading = false;
      },
      error => {
        console.error(error);

        // Deactivate loader
        this.isLoading = false;
      }
    );
  }


  // PARAMETER LISTENER
  parameterListener(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        // Get Current Post
        this.getCurrentPost(params['id']);
      }
    );
  }


  // ON HANDLE MODAL
  onToggleModal(): void {
    // Toggle styles
    ThemeFunctions.toggleModalStyles(this.isModalOpen);

    // Toggle modal
    this.isModalOpen = !this.isModalOpen;
  }

}
