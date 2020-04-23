import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Reducers, localStorageSyncReducer } from 'app/core/ngrx/reducers/store';
import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
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
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(Reducers, { metaReducers }),
    NgbModule,
    CoreModule,
    AuthModule,
    HomeModule,
    NewsModule,
    ContactModule,
    AccountModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
