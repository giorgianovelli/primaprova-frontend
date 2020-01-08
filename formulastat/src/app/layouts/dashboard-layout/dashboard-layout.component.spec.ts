import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayoutComponent } from './dashboard-layout.component';
import {generalConfiguration, generalDeclaration} from '../../../test';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: generalConfiguration,
      declarations: generalDeclaration
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
