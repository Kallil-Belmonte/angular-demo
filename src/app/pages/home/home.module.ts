import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from 'app/pages/home/home.component';
import { FeaturedPostsComponent } from 'app/pages/home/featured-posts/featured-posts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    FeaturedPostsComponent,
  ]
})
export class HomeModule { }
