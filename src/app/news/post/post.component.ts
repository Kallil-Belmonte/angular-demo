import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ThemeFunctions } from 'app/shared/theme-functions/theme-functions';
import { PostModel } from 'app/news/_models/post.model';
import { NewsService } from 'app/news/news.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: []
})
export class PostComponent implements OnInit {
  loading: boolean = true;
  isModalOpen: boolean = false;
  currentPost: PostModel;

  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService) { }

  ngOnInit() {
    this.parameterListener();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET CURRENT POST
  getCurrentPost(id): void {
    this.newsService.getCurrentPost(id).subscribe(
      data => {
        // Data
        this.currentPost = data;

        // Deactivate loader
        this.loading = false;
      },
      error => {
        console.log(error);

        // Deactivate loader
        this.loading = false;
      }
    );
  }


  // PARAMETER LISTENER
  parameterListener(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        // Get current post
        this.getCurrentPost(params['id']);
      }
    );
  }


  // ON OPEN MODAL
  onToggleModal(): void {
    // Toggle styles
    ThemeFunctions.toggleModalStyles(this.isModalOpen);

    // Toggle modal
    this.isModalOpen = !this.isModalOpen;
  }
}
