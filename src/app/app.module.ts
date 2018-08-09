import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {CoreModule} from './core/core.module';
import {CarModule} from './car/car.module';
import {AuthModule} from './auth/auth.module';
import {ServiceModule} from './service/service.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CarModule,
    AuthModule,
    ServiceModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}