import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as PostActions from 'app/core/ngrx/actions/post.actions';
import * as Helpers from 'app/shared/helpers';
import { PostModel } from 'app/news/_models/post.model';
import { NewsService } from 'app/news/news.service';

type postState = {
  currentPost: PostModel
};

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.scss']
})
export class EditPostFormComponent implements OnInit {

  loading: boolean = true;
  editPostForm: FormGroup;
  currentPost: PostModel;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private store: Store<postState>,
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
  getCurrentPost(id: string): void {
    this.newsService.getCurrentPost(id).subscribe(
      data => {
        // Set Current Post
        this.currentPost = data;

        // Set initial Edit Post Form value
        this.editPostForm.setValue({
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


  // EDIT POST FORM

  // On Set Input Class
  onSetInputClass(formControlName: string, classNames?: string[]): string[] {
    return Helpers.setInputClassName(this.editPostForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName: string): boolean {
    return Helpers.showFieldErrors(this.editPostForm, formControlName);
  }

  // On Set Title Error Class
  onSetTitleErrorClass(): string[] {
    return Helpers.setErrorClassName(this.editPostForm.get('title').errors.required);
  }

  // On Set Body Error Class
  onSetBodyErrorClass(): string[] {
    return Helpers.setErrorClassName(this.editPostForm.get('body').errors.required);
  }

  // On Submit
  onSubmit(): void {
    // Activate loader
    this.loading = true;

    this.newsService.editCurrentPost(this.currentPost.id, this.editPostForm.value).subscribe(
      () => {
        // Update Current Post
        this.currentPost = {
          userId: this.currentPost.userId,
          id: this.currentPost.id,
          title: this.editPostForm.value.title,
          body:  this.editPostForm.value.body
        }

        // Set data to reducer
        this.store.dispatch(new PostActions.EditCurrentPost(this.currentPost));

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
