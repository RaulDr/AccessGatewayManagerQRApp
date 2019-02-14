import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PagesModule } from '@app/pages/pages.module';
import { PrimengModule } from '@app/primeng.module';
import { ClarityModule } from '@clr/angular';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AuthModule } from './auth/auth.module';

import { registerLocaleData } from '@angular/common';
import * as ro from '@angular/common/locales/ro';
registerLocaleData(ro, 'ro');

@NgModule({
  declarations: [AppComponent],
  imports: [
    // CORE
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // @ngx-loading-bar
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,

    // DEPS
    ClarityModule,
    PrimengModule,
    AuthModule,
    AsyncLocalStorageModule,

    // ACGM
    PagesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
