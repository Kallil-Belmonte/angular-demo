import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { Reducers, localStorageSyncReducer } from 'app/core/ngrx/reducers/config.reducers';
import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
import { AuthModule } from 'app/auth/auth.module';
import { HomeModule } from 'app/home/home.module';
import { NewsModule } from 'app/news/news.module';
import { ContactModule } from 'app/contact/contact.module';
import { AccountModule } from 'app/account/account.module';
import { NotFoundComponent } from 'app/not-found/not-found.component';

// ngrx-store-localstorage
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

// ngx-mask
export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(Reducers, { metaReducers }),
    NgbModule,
    NgxMaskModule.forRoot(options),
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
