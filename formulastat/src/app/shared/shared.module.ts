import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LivebarComponent} from './livebar/livebar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MatButtonModule, MatSidenavModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {TableComponent} from './table/table.component';


@NgModule({
  declarations: [
    LivebarComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent
  ],
  exports: [
    LivebarComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent
  ],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    CommonModule
  ]
})
export class SharedModule { }
