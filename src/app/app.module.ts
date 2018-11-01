import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { NotFoundComponent } from 'app/not-found/not-found.component';
import { CoreModule } from 'app/core/core.module';
import { AuthModule } from 'app/auth/auth.module';
import { HomeModule } from 'app/home/home.module';
import { NewsModule } from 'app/news/news.module';
import { ContactModule } from 'app/contact/contact.module';
import { AccountModule } from 'app/account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
