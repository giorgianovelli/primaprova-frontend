// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {SharedModule} from './app/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app/app.component';
import {LayoutModule} from './app/layouts/layout.module';
import {AppRoutingModule} from './app/app-routing.module';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardModule} from './app/dashboard/dashboard.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

declare const require: any;

export const generalDeclaration = [
  AppComponent
];

export const generalConfiguration = [
  RouterTestingModule,
  SharedModule,
  BrowserModule,
  AppRoutingModule,
  LayoutModule,
  HttpClientModule,
  FormsModule,
  BrowserAnimationsModule,
  DashboardModule,
  HttpClientTestingModule
];

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);



// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
