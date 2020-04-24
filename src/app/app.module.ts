import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Reducers, localStorageSyncReducer } from 'app/core/ngrx/reducers/store';
import { AppRoutingModule } from 'app/core/app-routing.module';
import { AppComponent } from 'app/app.component';
import { HeaderComponent } from 'app/layout/header/header.component';
import { DashboardComponent } from 'app/layout/dashboard/dashboard.component';
import { FooterComponent } from 'app/layout/footer/footer.component';
import { AuthInterceptor } from 'app/pages/auth/auth.interceptor';

import { AuthModule } from 'app/pages/auth/auth.module';
import { HomeModule } from 'app/pages/home/home.module';
import { NewsModule } from 'app/pages/news/news.module';
import { ContactModule } from 'app/pages/contact/contact.module';
import { AccountModule } from 'app/pages/account/account.module';
import { NotFoundComponent } from 'app/pages/not-found/not-found.component';

// ngrx-store-localstorage
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(Reducers, { metaReducers }),
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    NewsModule,
    ContactModule,
    AccountModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
