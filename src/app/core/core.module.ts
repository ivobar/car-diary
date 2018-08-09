import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WelcomeComponent} from './welcome/welcome.component';
import {NavComponent} from './nav/nav.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [
    WelcomeComponent,
    NavComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    AppRoutingModule,
    NavComponent
  ]
})
export class CoreModule {
}
