import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from 'app/core/header/header.component';
import { DashboardComponent } from 'app/core/dashboard/dashboard.component';
import { FooterComponent } from 'app/core/footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    DashboardComponent,
    FooterComponent
  ]
})
export class CoreModule { }
