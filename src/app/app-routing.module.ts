import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

/*import {WelcomeComponent} from './core/welcome/welcome.component';*/
import {NotFoundComponent} from './core/not-found/not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cars' /*component: WelcomeComponent*/},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
