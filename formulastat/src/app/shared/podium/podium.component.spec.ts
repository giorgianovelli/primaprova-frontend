import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodiumComponent } from './podium.component';
import {generalConfiguration, generalDeclaration} from '../../../test';

describe('PodiumComponent', () => {
  let component: PodiumComponent;
  let fixture: ComponentFixture<PodiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: generalConfiguration,
      declarations: generalDeclaration
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
