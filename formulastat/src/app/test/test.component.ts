import { Component, OnInit } from '@angular/core';
import {FormulastatService} from '../api/formulastat.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private formulaService: FormulastatService) { }

  ngOnInit() {
    this.getLastDriverStanding();
  }

  getLastDriverStanding() {
    this.formulaService.getLastDriverStanding()
      .subscribe(console.log);
  }

}
