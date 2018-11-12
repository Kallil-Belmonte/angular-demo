import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LimitWordsPipe } from 'app/shared/pipes/limit-words/limit-words.pipe';
import { LoaderComponent } from 'app/shared/components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { PostItemComponent } from 'app/shared/components/post-item/post-item.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  declarations: [
    LimitWordsPipe,
    LoaderComponent,
    AlertComponent,
    PostItemComponent,
    PageHeaderComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    LimitWordsPipe,
    LoaderComponent,
    AlertComponent,
    PostItemComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
