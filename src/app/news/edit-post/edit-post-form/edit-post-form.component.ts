import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PostModel } from 'app/news/_models/post.model';
import { NewsService } from 'app/news/news.service';

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.scss']
})
export class EditPostFormComponent implements OnInit {

  loading: boolean = true;
  editPostForm: FormGroup;
  currentPost: PostModel;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private newsService: NewsService,
              private router: Router) { }

  ngOnInit() {
    this.buildEditPostForm();
    this.parameterListener();
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // BUILD EDIT POST FORM
  buildEditPostForm(): void {
    this.editPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body:  ['', [Validators.required]]
    });
  }


  // GET CURRENT POST
  getCurrentPost(id): void {
    this.newsService.getCurrentPost(id).subscribe(
      data => {
        // Data
        this.currentPost = data;

        // Set initial Edit Post Form value
        this.editPostForm.patchValue({
          title: this.currentPost.title,
          body:  this.currentPost.body
        });

        // Deactivate loader
        this.loading = false;
      },
      error => {
        console.error(error);

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


  // ON RESET EDIT POST FORM
  onResetEditPostForm(): void {
    this.editPostForm.reset();
  }


  // ON SUBMIT EDIT POST FORM
  onSubmitEditPostForm(): void {
    // Activate loader
    this.loading = true;

    this.newsService.editCurrentPost(this.currentPost.id, this.editPostForm.value).subscribe(
      data => {
        console.log(data);

        // Update Edit Post Form value
        this.editPostForm.patchValue({
          title: this.editPostForm.value.title,
          body:  this.editPostForm.value.body
        });

        // Deactivate loader
        this.loading = false;

        // Redirect
        this.router.navigate(['/post/' + this.currentPost.id]);
      },
      error => {
        console.error(error);

        // Deactivate loader
        this.loading = false;
      }
    );
  }

}
