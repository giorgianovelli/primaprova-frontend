import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonComponent } from './season.component';
import {generalConfiguration, generalDeclaration} from '../../../test';

describe('SeasonComponent', () => {
  let component: SeasonComponent;
  let fixture: ComponentFixture<SeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: generalConfiguration,
      declarations: generalDeclaration
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
