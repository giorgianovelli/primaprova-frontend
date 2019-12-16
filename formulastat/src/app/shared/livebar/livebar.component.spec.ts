import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivebarComponent } from './livebar.component';

describe('LivebarComponent', () => {
  let component: LivebarComponent;
  let fixture: ComponentFixture<LivebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivebarComponent ]
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
