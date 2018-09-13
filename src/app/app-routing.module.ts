import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './core/not-found/not-found.component';
import {WelcomeComponent} from './core/welcome/welcome.component';
import {HomepageGuardService} from './auth/homepage.guard.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', canActivate: [HomepageGuardService], component: WelcomeComponent},
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
