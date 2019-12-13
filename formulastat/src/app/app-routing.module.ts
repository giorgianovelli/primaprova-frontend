import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SeasonComponent} from './season/season.component';
import {CircuitComponent} from './circuit/circuit.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
