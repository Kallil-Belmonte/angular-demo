import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthInterceptor } from 'app/auth/auth.interceptor';
import { AppRoutingModule } from 'app/app-routing.module';
import { HeaderComponent } from 'app/core/header/header.component';
import { DashboardComponent } from 'app/core/dashboard/dashboard.component';
import { FooterComponent } from 'app/core/footer/footer.component';

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
  providers: [
  	// AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
