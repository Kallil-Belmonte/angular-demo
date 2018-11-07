import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimitWordsPipe } from 'app/shared/pipes/limit-words/limit-words.pipe';
import { PostItemComponent } from 'app/shared/components/post-item/post-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LimitWordsPipe,
    PostItemComponent
  ],
  exports: [
    LimitWordsPipe,
    PostItemComponent
  ]
})
export class SharedModule { }
