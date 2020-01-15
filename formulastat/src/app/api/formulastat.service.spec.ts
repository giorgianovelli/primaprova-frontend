import { TestBed } from '@angular/core/testing';

import { FormulastatService } from './formulastat.service';
import {generalConfiguration, generalDeclaration} from '../../test';
import {HttpTestingController} from '@angular/common/http/testing';

describe('FormulastatService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: generalConfiguration,
    declarations: generalDeclaration,
    providers: [FormulastatService]
  }));
  // Notice that we don’t have the compileComponents method.
  // We need that only for components as it converts your html and css urls to inline code.

  it('should be created', () => {
    const service: FormulastatService = TestBed.get(FormulastatService);
    expect(service).toBeTruthy();
  });

  // check if the module is configured properly and the instance of our class is defined or not
  it('get initialized', () => {
    const service: FormulastatService = TestBed.get(FormulastatService);
    expect(service).toBeDefined();
  });

  it('should get the data successful', () => {
    const formulaService = TestBed.get(FormulastatService);
    // HttpTestingController: mock requests instead of making real API requests to our API back-end when testing.
    const httpMock = TestBed.get(HttpTestingController); // to mock http calls
    formulaService.getYearChamp('2019').subscribe((data: any) => {
      expect(data.driverId).toBe('hamilton');
    });

    const req = httpMock.expectOne('https://ergast.com/api/f1/2019/driverStandings/1.json', 'call to api');
    // expect(req.request.method).toBe('GET');

    req.flush({
      driverId: 'hamilton'
    });

    httpMock.verify(); // it verifies that there are not outstanding http calls

  });
});
