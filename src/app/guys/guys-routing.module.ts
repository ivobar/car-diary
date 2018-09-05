import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuyAddComponent} from './guy-add/guy-add.component';
import {GuyEditComponent} from './guy-edit/guy-edit.component';
import {GuyListComponent} from './guy-list/guy-list.component';


const guysRoutes: Routes = [
  {
    path: 'guys', children: [
      {path: 'add', component: GuyAddComponent},
      {path: ':guyId/edit', component: GuyEditComponent},
      {path: 'list', component: GuyListComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(guysRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GuysRoutingModule {
}
