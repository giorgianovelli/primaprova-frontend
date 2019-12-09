import { TestBed } from '@angular/core/testing';

import { FormulastatService } from './formulastat.service';

describe('FormulastatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormulastatService = TestBed.get(FormulastatService);
    expect(service).toBeTruthy();
  });
});
