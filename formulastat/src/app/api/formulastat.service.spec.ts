import { TestBed } from '@angular/core/testing';

import { FormulastatService } from './formulastat.service';
import {generalConfiguration, generalDeclaration} from '../../test';

describe('FormulastatService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: generalConfiguration,
    declarations: generalDeclaration
  }));

  it('should be created', () => {
    const service: FormulastatService = TestBed.get(FormulastatService);
    expect(service).toBeTruthy();
  });
});
