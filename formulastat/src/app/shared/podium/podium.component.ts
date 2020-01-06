import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {
  private _data: number[] = [];
  get data() {
    return this._data;
  }
  @Input() set data(val) {
    this._data = val;
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels = ['1st', '2nd', '3rd'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[];
  constructor() { }
  ngOnInit() {
   this.barChartData = [
     {
       data: this.data,
       label: 'Number of podiums',
       backgroundColor: 'rgba(170,170,170,0.5)',
       hoverBackgroundColor: 'rgba(79,79,79,0.5)'
     }
    ];
   console.log(this.data);
   console.log(this.barChartData);
  }

}
