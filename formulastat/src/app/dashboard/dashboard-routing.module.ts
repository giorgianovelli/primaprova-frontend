import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CircuitComponent} from './circuit/circuit.component';
import {SeasonComponent} from './season/season.component';
import {DriverComponent} from './driver/driver.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'circuit',
    pathMatch: 'full'
  },
  {
    path: 'circuit',
    component: CircuitComponent
  },
  {
    path: 'season',
    component: SeasonComponent
  },
  {
    path: 'driver',
    component: DriverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
