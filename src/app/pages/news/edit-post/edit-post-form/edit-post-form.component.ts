import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as PostActions from 'app/core/ngrx/actions/post.actions';
import * as Helpers from 'app/shared/helpers';
import { AppState } from 'app/core/ngrx/reducers/store';
import { PostModel } from 'app/pages/news/_models/post.model';
import { NewsService } from 'app/pages/news/news.service';

const { required } = Validators;
const { EditCurrentPost } = PostActions;
const { setFieldClassName, showFieldErrors, setErrorClassName } = Helpers;

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.scss']
})
export class EditPostFormComponent implements OnInit {

  isLoading: boolean = true;
  editPostForm: FormGroup;
  currentPost: PostModel;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private store: Store<AppState>,
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
      title: ['', [required]],
      body:  ['', [required]]
    });
  }


  // SET FORM DATA
  setFormData(): void {
    const { title, body } = this.currentPost;
    this.editPostForm.setValue({ title, body });
  }


  // GET CURRENT POST
  getCurrentPost(id: string): void {
    this.newsService.getCurrentPost(id).subscribe(
      data => {
        this.currentPost = data;
        this.setFormData();
        this.store.dispatch(new EditCurrentPost(this.currentPost));
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }


  // PARAMETER LISTENER
  parameterListener(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.getCurrentPost(params['id']);
      }
    );
  }


  // EDIT POST FORM

  // On Set Input Class
  onSetInputClass(formControlName: string, classNames?: string[]): string[] {
    return setFieldClassName(this.editPostForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName: string): boolean {
    return showFieldErrors(this.editPostForm, formControlName);
  }

  // On Set Title Error Class
  onSetTitleErrorClass(): string[] {
    return setErrorClassName(this.editPostForm.get('title').errors.required);
  }

  // On Set Body Error Class
  onSetBodyErrorClass(): string[] {
    return setErrorClassName(this.editPostForm.get('body').errors.required);
  }

  // On Submit
  onSubmit(): void {
    this.isLoading = true;

    this.newsService.EditPost(this.currentPost.id, this.editPostForm.value).subscribe(
      () => {
        const { userId, id } = this.currentPost;
        const { title, body } = this.editPostForm.value;

        this.currentPost = {
          userId,
          id,
          title,
          body,
        };
        this.store.dispatch(new EditCurrentPost(this.currentPost));
        this.isLoading = false;
        this.router.navigate([`/post/${this.currentPost.id}`]);
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

}
