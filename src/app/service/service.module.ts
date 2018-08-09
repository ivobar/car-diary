import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ServiceListComponent} from './service-list/service-list.component';
import {ServiceDetailComponent} from './service-detail/service-detail.component';
import {ServiceEditComponent} from './service-edit/service-edit.component';

import {CarModule} from '../car/car.module';
import {ServiceRoutingModule} from './service-routing.module';

@NgModule({
  declarations: [
    ServiceListComponent,
    ServiceDetailComponent,
    ServiceEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule {
}
