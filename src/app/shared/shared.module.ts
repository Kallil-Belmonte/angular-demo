import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LimitWordsPipe } from 'app/shared/pipes/limit-words/limit-words.pipe';
import { PostItemComponent } from 'app/shared/components/post-item/post-item.component';
import { LoaderComponent } from 'app/shared/components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LimitWordsPipe,
    PostItemComponent,
    LoaderComponent
  ],
  exports: [
    LimitWordsPipe,
    PostItemComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
