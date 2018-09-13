import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ServiceListComponent} from './service-list/service-list.component';
import {ServiceEditComponent} from './service-edit/service-edit.component';
import {ServiceAddComponent} from './service-add/service-add.component';
import {ServiceDetailComponent} from './service-detail/service-detail.component';
import {AuthGuardService} from '../auth/auth.guard.service';

const serviceRoutes: Routes = [
  {
    path: 'cars/car/:id/services', canActivate: [AuthGuardService], children: [
      {path: '', component: ServiceListComponent},
      {path: 'add', component: ServiceAddComponent},
      {path: 'details/:serviceId', component: ServiceDetailComponent},
      {path: 'edit/:serviceId', component: ServiceEditComponent}
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
