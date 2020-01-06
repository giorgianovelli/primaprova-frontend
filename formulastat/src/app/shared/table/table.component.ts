import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private _data;
  public columns = [];

  get data() {
    return this._data;
  }

  @Input() set data(val) {
    if (val && val.length > 0) {
      this.columns = Object.keys(val[0]);
    }
    this._data = val;
  }
  constructor() {
  }

  ngOnInit() {
    console.log(this.data);
  }

}
