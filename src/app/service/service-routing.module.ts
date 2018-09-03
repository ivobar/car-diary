import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ServiceListComponent} from './service-list/service-list.component';
import {ServiceEditComponent} from './service-edit/service-edit.component';
import {ServiceAddComponent} from './service-add/service-add.component';
import {ServiceDetailComponent} from './service-detail/service-detail.component';
import {GuyAddComponent} from './guy/guy-add/guy-add.component';

const serviceRoutes: Routes = [
  {
    path: 'cars/car/:id/services', children: [
      {path: '', component: ServiceListComponent},
      {path: 'add', component: ServiceAddComponent},
      {path: 'details/:serviceId', component: ServiceDetailComponent},
      {path: 'edit/:serviceId', component: ServiceEditComponent}
    ]
  },
  {path: 'guy/add', component: GuyAddComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(serviceRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServiceRoutingModule {
}
