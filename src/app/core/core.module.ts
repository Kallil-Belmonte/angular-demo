import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from 'app/app-routing.module';
import { HeaderComponent } from 'app/core/header/header.component';
import { DashboardComponent } from 'app/core/dashboard/dashboard.component';
import { FooterComponent } from 'app/core/footer/footer.component';
import { AuthInterceptor } from 'app/auth/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
    DashboardComponent,
    FooterComponent
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
