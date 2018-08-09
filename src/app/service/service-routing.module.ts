import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ServiceListComponent} from './service-list/service-list.component';
import {ServiceEditComponent} from './service-edit/service-edit.component';
import {ServiceDetailComponent} from './service-detail/service-detail.component';

const serviceRoutes: Routes = [
  {
    path: 'car/:id/services', children: [
      {path: '', component: ServiceListComponent},
      {path: 'add', component: ServiceEditComponent},
      {path: 'details/:serviceId', component: ServiceDetailComponent}
    ]
  }
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
