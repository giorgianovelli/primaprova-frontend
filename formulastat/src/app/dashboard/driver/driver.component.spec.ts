import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverComponent } from './driver.component';
import {generalConfiguration, generalDeclaration} from '../../../test';

describe('DriverComponent', () => {
  let component: DriverComponent;
  let fixture: ComponentFixture<DriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: generalConfiguration,
      declarations: generalDeclaration
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
