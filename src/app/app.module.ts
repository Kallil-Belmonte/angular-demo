import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { authReducer } from 'app/core/redux/reducers/auth.reducer';
import { userDataReducer } from 'app/core/redux/reducers/user-data.reducer';

import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
import { AuthModule } from 'app/auth/auth.module';
import { HomeModule } from 'app/home/home.module';
import { NewsModule } from 'app/news/news.module';
import { ContactModule } from 'app/contact/contact.module';
import { AccountModule } from 'app/account/account.module';
import { NotFoundComponent } from 'app/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      auth: authReducer,
      userData: userDataReducer
    }),
    CoreModule,
    AuthModule,
    HomeModule,
    NewsModule,
    ContactModule,
    AccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
