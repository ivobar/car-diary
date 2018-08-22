import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CarListComponent} from './car-list/car-list.component';
import {CarDetailComponent} from './car-detail/car-detail.component';
import {CarEditComponent} from './car-edit/car-edit.component';
import {CarRoutingModule} from './car-routing.module';
import {CarHeadComponent} from './car-head/car-head.component';

@NgModule({
  declarations: [
    CarListComponent,
    CarDetailComponent,
    CarEditComponent,
    CarHeadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarRoutingModule
  ],
  exports: [
    CarHeadComponent
  ]
})
export class CarModule {
}
