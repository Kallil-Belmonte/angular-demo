import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LimitWordsPipe } from 'app/shared/pipes/limit-words/limit-words.pipe';
import { LoaderComponent } from 'app/shared/components/loader/loader.component';
import { AlertDismissibleComponent } from 'app/shared/components/alert-dismissible/alert-dismissible.component';
import { PageHeaderComponent } from 'app/shared/components/page-header/page-header.component';
import { PostItemComponent } from 'app/shared/components/post-item/post-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  declarations: [
    LimitWordsPipe,
    LoaderComponent,
    AlertDismissibleComponent,
    PageHeaderComponent,
    PostItemComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    LimitWordsPipe,
    LoaderComponent,
    AlertDismissibleComponent,
    PageHeaderComponent,
    PostItemComponent,
  ]
})
export class SharedModule { }
