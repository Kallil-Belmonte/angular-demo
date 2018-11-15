import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from 'app/shared/shared.module';
import { BlogComponent } from 'app/news/blog/blog.component';
import { PostsFilterComponent } from 'app/news/blog/posts-filter/posts-filter.component';
import { PostsComponent } from 'app/news/blog/posts/posts.component';
import { PaginationComponent } from 'app/news/blog/pagination/pagination.component';
import { CategoriesComponent } from 'app/news/blog/categories/categories.component';
import { PostComponent } from 'app/news/post/post.component';
import { EditPostComponent } from 'app/news/edit-post/edit-post.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule
  ],
  declarations: [
    BlogComponent,
    PostsFilterComponent,
    PostsComponent,
    PaginationComponent,
    CategoriesComponent,
    PostComponent,
    EditPostComponent
  ]
})
export class NewsModule { }
