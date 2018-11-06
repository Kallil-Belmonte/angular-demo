import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from 'app/home/home.component';
import { FeaturedPostsComponent } from './featured-posts/featured-posts.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HomeComponent,
    FeaturedPostsComponent
  ]
})
export class HomeModule { }
