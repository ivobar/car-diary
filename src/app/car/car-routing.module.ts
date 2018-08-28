import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CarDetailComponent} from './car-detail/car-detail.component';
import {CarListComponent} from './car-list/car-list.component';
import {CarEditComponent} from './car-edit/car-edit.component';
import {CarService} from './car.service';

const carRoutes: Routes = [
  {
    path: 'cars', children: [
      {path: '', component: CarListComponent},
      {path: 'car/add', component: CarEditComponent},
      {path: 'car/:id/detail', component: CarDetailComponent},
      {path: 'car/:id/edit', component: CarEditComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(carRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CarService
  ]
})
export class CarRoutingModule {
}
