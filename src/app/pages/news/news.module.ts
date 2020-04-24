import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from 'app/shared/shared.module';
import { BlogComponent } from 'app/pages/news/blog/blog.component';
import { PostsPerPageComponent } from 'app/pages/news/blog/posts-per-page/posts-per-page.component';
import { PostsComponent } from 'app/pages/news/blog/posts/posts.component';
import { BlogPaginationComponent } from 'app/pages/news/blog/blog-pagination/blog-pagination.component';
import { CategoriesComponent } from 'app/pages/news/blog/categories/categories.component';
import { PostComponent } from 'app/pages/news/post/post.component';
import { PostBodyComponent } from 'app/pages/news/post/post-body/post-body.component';
import { DeletePostModalComponent } from 'app/pages/news/post/delete-post-modal/delete-post-modal.component';
import { EditPostComponent } from 'app/pages/news/edit-post/edit-post.component';
import { EditPostFormComponent } from 'app/pages/news/edit-post/edit-post-form/edit-post-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
  ],
  declarations: [
    BlogComponent,
    PostsPerPageComponent,
    PostsComponent,
    BlogPaginationComponent,
    CategoriesComponent,
    PostComponent,
    PostBodyComponent,
    DeletePostModalComponent,
    EditPostComponent,
    EditPostFormComponent,
  ]
})
export class NewsModule { }
