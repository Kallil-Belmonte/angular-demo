import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LimitWordsPipe } from 'app/shared/pipes/limit-words/limit-words.pipe';
import { LoaderComponent } from 'app/shared/components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { PostItemComponent } from 'app/shared/components/post-item/post-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LimitWordsPipe,
    LoaderComponent,
    AlertComponent,
    PostItemComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    LimitWordsPipe,
    LoaderComponent,
    AlertComponent,
    PostItemComponent
  ]
})
export class SharedModule { }
