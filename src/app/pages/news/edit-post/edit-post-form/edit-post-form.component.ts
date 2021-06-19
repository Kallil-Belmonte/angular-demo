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
const { getFieldClass, hasErrorMessages, getErrorMessageClass, clearFormMessage } = Helpers;

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.scss'],
})
export class EditPostFormComponent implements OnInit {
  isLoading: boolean = true;
  editPostForm: FormGroup;
  currentPost: PostModel;
  getFieldClass = (formControlName: string, classNames?: string[]) =>
    getFieldClass(this.editPostForm, formControlName, classNames);
  hasErrorMessages = (formControlName: string) =>
    hasErrorMessages(this.editPostForm, formControlName);
  getErrorMessageClass = (formControlName: string, validations: string[]) =>
    getErrorMessageClass(this.editPostForm, formControlName, validations);

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
  // METHODS
  //==============================

  buildEditPostForm(): void {
    this.editPostForm = this.formBuilder.group({
      title: ['', [required]],
      body: ['', [required]],
    });
  }

  setFormData(): void {
    this.store.pipe(select((state: AppState) => state)).subscribe(({ currentPost }) => {
      const { title, body } = currentPost;
      this.currentPost = currentPost;
      this.editPostForm.setValue({ title, body });
    });
  }

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

  parameterListener(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getCurrentPost(params['id']);
    });
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
