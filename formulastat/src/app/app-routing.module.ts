import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardLayoutComponent} from './layouts/dashboard/dashboard-layout/dashboard-layout.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
