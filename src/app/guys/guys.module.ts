import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {GuyAddComponent} from './guy-add/guy-add.component';
import {GuyEditComponent} from './guy-edit/guy-edit.component';
import {GuyListComponent} from './guy-list/guy-list.component';

import {GuysRoutingModule} from './guys-routing.module';

@NgModule({
  declarations: [
    GuyAddComponent,
    GuyEditComponent,
    GuyListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GuysRoutingModule
  ]
})
export class GuysModule {
}
