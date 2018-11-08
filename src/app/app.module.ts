import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
