import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivebarComponent } from './livebar.component';
import {generalConfiguration, generalDeclaration} from '../../../test';
import {FormulastatService} from '../../api/formulastat.service';
import {HttpClient} from '@angular/common/http';
import {__await} from 'tslib';
import {promise} from 'selenium-webdriver';

describe('LivebarComponent', () => {
  let component: LivebarComponent;
  let fixture: ComponentFixture<LivebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: generalConfiguration,
      declarations: generalDeclaration
      // providers: [FormulastatService, HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    /*spyOn(component, 'finalizeCircuitCall').and.callFake(() => {
      done();
    });
    component.ngOnInit();*/
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test array filled by method that call service method with http get
  it('should call ngOnInit and fill driverStanding[]', () => {
    spyOn(component, 'getLastDriverStanding').and.callThrough();
    component.ngOnInit();
    expect(component.getLastDriverStanding).toHaveBeenCalledTimes(1);
    /*
    component.catchNgOnInit.subscribe(val => {
      console.log("subscribe!", val);
      expect(component.driverStanding.length).toBeGreaterThan(0);
    });
    expect(component.driverStanding.length).toBeGreaterThan(0);
    /*setTimeout(() => {
      expect(component.driverStanding.length).toBeGreaterThan(0);
      done();
    }, 3000);
    await new Promise(r => setTimeout(() => r(), 4000)).then(() => {
      expect(component.driverStanding.length).toBeGreaterThan(0);
    });*/
  });
});
