import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPodiumComponent } from './static-podium.component';

describe('StaticPodiumComponent', () => {
  let component: StaticPodiumComponent;
  let fixture: ComponentFixture<StaticPodiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPodiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPodiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
