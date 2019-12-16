import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeasonComponent } from './shared/season/season.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import {FormsModule} from '@angular/forms';
import { TestComponent } from './test/test.component';
import { CircuitComponent } from './shared/circuit/circuit.component';
import { DriverComponent } from './shared/driver/driver.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layouts/dashboard/header/header.component';
import { LivebarComponent } from './layouts/dashboard/livebar/livebar.component';
import { FooterComponent } from './layouts/dashboard/footer/footer.component';
import {DashboardLayoutComponent} from './layouts/dashboard/dashboard-layout/dashboard-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    SeasonComponent,
    DashboardComponent,
    TestComponent,
    CircuitComponent,
    DriverComponent,
    HeaderComponent,
    LivebarComponent,
    FooterComponent,
    DashboardLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
