import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from 'app/home/home.component';
import { FeaturedPostsComponent } from 'app/home/featured-posts/featured-posts.component';
// import { PostItemComponent } from 'app/shared/components/post-item/post-item.component';
// import { LimitWordsPipe } from 'app/shared/pipes/limit-words/limit-words.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    FeaturedPostsComponent,
    // PostItemComponent,
    // LimitWordsPipe
  ]
})
export class HomeModule { }
