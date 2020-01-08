import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivebarComponent } from './livebar.component';
import {generalConfiguration, generalDeclaration} from '../../../test';

describe('LivebarComponent', () => {
  let component: LivebarComponent;
  let fixture: ComponentFixture<LivebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: generalConfiguration,
      declarations: generalDeclaration
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
