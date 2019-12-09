import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SeasonComponent} from './season/season.component';


const routes: Routes = [
  {
    path: '',
    component: SeasonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
