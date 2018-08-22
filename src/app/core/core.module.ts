import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {WelcomeComponent} from './welcome/welcome.component';
import {NavComponent} from './nav/nav.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {AppRoutingModule} from '../app-routing.module';
import {SpinnerInterceptor} from '../shared/spinner.interceptor';
import {LoaderComponent} from './loader/loader.component';
import {LoaderService} from './loader.service';

@NgModule({
  declarations: [
    WelcomeComponent,
    NavComponent,
    NotFoundComponent,
    LoaderComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    AppRoutingModule,
    NavComponent,
    LoaderComponent
  ],
  providers: [
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ]
})
export class CoreModule {
}
