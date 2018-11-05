import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'app/app-routing.module';
import { HeaderComponent } from 'app/core/header/header.component';
import { DashboardComponent } from 'app/core/dashboard/dashboard.component';
import { FooterComponent } from 'app/core/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  declarations: [
    HeaderComponent,
    DashboardComponent,
    FooterComponent
  ],
  exports: [
    AppRoutingModule
  ],
  // providers: [
  // 	AuthGuard,
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ]
})
export class CoreModule { }
