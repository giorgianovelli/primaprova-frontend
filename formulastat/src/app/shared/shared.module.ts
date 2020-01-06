import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LivebarComponent} from './livebar/livebar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MatButtonModule, MatSidenavModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {TableComponent} from './table/table.component';
import {CdkTableModule} from '@angular/cdk/table';
import { ChartsModule } from 'ng2-charts';
import { PodiumComponent } from './podium/podium.component';
import { StaticPodiumComponent } from './static-podium/static-podium.component';


@NgModule({
  declarations: [
    LivebarComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    PodiumComponent,
    StaticPodiumComponent
  ],
  exports: [
    LivebarComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    PodiumComponent,
    StaticPodiumComponent
  ],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    CdkTableModule,
    ChartsModule,
    CommonModule
  ]
})
export class SharedModule { }
