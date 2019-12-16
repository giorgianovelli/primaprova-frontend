import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {CircuitComponent} from './circuit/circuit.component';
import {DriverComponent} from './driver/driver.component';
import {SeasonComponent} from './season/season.component';


@NgModule({
  declarations: [
    CircuitComponent,
    DriverComponent,
    SeasonComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
