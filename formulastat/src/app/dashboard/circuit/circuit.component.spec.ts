import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitComponent } from './circuit.component';
import {generalConfiguration, generalDeclaration} from '../../../test';
import {FormulastatService} from '../../api/formulastat.service';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

describe('CircuitComponent', () => {
  let component: CircuitComponent;
  let fixture: ComponentFixture<CircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: generalConfiguration,
      declarations: generalDeclaration
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method one time', () => {
    const formulaService = TestBed.get(FormulastatService);
    spyOn(formulaService, 'getCircuits').and.callThrough();
    component.refreshCircuits().subscribe();
    expect(formulaService.getCircuits).toHaveBeenCalledTimes(1);
  });

});
