import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './guards/auth.guard';
import {InvalidRouteComponent} from './shared/component/invalid-route/invalid-route.component';

const route: Routes = [
  {path: '', component: AppComponent, children: [
      {path: '', redirectTo: 'auth', pathMatch: 'full'},
      {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
      // tslint:disable-next-line:max-line-length
      {path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
      {path: '**', component: InvalidRouteComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot( route )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
