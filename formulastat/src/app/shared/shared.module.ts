import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LivebarComponent} from './livebar/livebar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MatButtonModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    LivebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    LivebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    CommonModule
  ]
})
export class SharedModule { }
