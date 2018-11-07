import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogComponent } from 'app/news/blog/blog.component';
import { PostComponent } from 'app/news/post/post.component';
import { EditPostComponent } from 'app/news/edit-post/edit-post.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BlogComponent,
    PostComponent,
    EditPostComponent
  ]
})
export class NewsModule { }
