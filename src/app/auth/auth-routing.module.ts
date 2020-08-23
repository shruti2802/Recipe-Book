import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {SignUpComponent} from '../auth/sign-up/sign-up.component';
import {AuthComponent} from './auth.component';
import {InvalidRouteComponent} from '../shared/component/invalid-route/invalid-route.component';

const route: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: '**', component: InvalidRouteComponent}
    ]
  },
  {path: '**', component: InvalidRouteComponent}

];

@NgModule({
  imports: [RouterModule.forChild( route )],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
