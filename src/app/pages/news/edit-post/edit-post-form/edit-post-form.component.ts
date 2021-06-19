import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import * as PostActions from 'app/core/ngrx/actions/post.actions';
import * as Helpers from 'app/shared/helpers';
import { AppState } from 'app/core/ngrx/reducers/store';
import { PostModel } from 'app/pages/news/_models/post.model';
import { NewsService } from 'app/pages/news/news.service';

const { required } = Validators;
const { SetCurrentPost } = PostActions;
const { getFieldClass, getFieldErrorMessages, getErrorClass } = Helpers;

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.scss'],
})
export class EditPostFormComponent implements OnInit {
  isLoading: boolean = true;
  editPostForm: FormGroup;
  currentPost: PostModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private newsService: NewsService,
    private router: Router,
  ) {}

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
      title: ['', [required]],
      body: ['', [required]],
    });
  }

  // SET FORM DATA
  setFormData(): void {
    this.store.pipe(select((state: AppState) => state)).subscribe(({ currentPost }) => {
      const { title, body } = currentPost;
      this.currentPost = currentPost;
      this.editPostForm.setValue({ title, body });
    });
  }

  // GET CURRENT POST
  getCurrentPost(id: string): void {
    this.newsService.getCurrentPost(id).subscribe(
      data => {
        this.store.dispatch(new SetCurrentPost(data));
        this.setFormData();
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      },
    );
  }

  // PARAMETER LISTENER
  parameterListener(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getCurrentPost(params['id']);
    });
  }

  // EDIT POST FORM
  getInputClass(formControlName: string, classNames?: string[]): string[] {
    return getFieldClass(this.editPostForm, formControlName, classNames);
  }

  getErrorMessageClass(formControlName: string, validations: string[]): string[] {
    const { errors } = this.editPostForm.get(formControlName);
    return getErrorClass(validations.every(key => errors[key]));
  }

  onSubmit(): void {
    this.isLoading = true;

    this.newsService.EditPost(this.currentPost.id, this.editPostForm.value).subscribe(
      () => {
        this.currentPost = {
          ...this.currentPost,
          ...this.editPostForm.value,
        };
        this.store.dispatch(new SetCurrentPost(this.currentPost));
        this.isLoading = false;
        this.router.navigate([`/post/${this.currentPost.id}`]);
      },
      error => {
        console.error(error);
        this.isLoading = false;
      },
    );
  }
}
