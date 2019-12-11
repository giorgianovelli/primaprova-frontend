import { Component, OnInit } from '@angular/core';
import {FormulastatService} from '../formulastat.service';
import {finalize, map, switchMap, tap, toArray} from 'rxjs/operators';
import {Circuit} from '../dto/circuit';
import {concat, merge, Observable, Subject} from 'rxjs';
import {Driver} from '../dto/driver';
import {Location} from '../dto/location';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss']
})
export class CircuitComponent implements OnInit {
  circuits: Circuit[] = [];
  circuit: Circuit;
  podium: Driver[] = [];
  selectedCircuit: string = '';
  loading = true;

  constructor(private formulaService: FormulastatService) { }

  ngOnInit() {
    this.loading = true;
    merge(
      this.refreshCircuits(),
      this.refreshCircuit(this.selectedCircuit),
      this.refreshLastSeasonResult(this.selectedCircuit)
    ).pipe(
      finalize(() => this.loading = false)
    ).subscribe();
  }
  selectChangeHandler(event: any) {
    merge(
      this.refreshCircuit(event.target.value),
      this.refreshLastSeasonResult(event.target.value)
    ).subscribe();
    console.log(event.target.value);
  }
  refreshCircuits() { // TODO lista input
    return this.formulaService.getCircuits()
      .pipe(
        //tap(console.log),
        map(c => c['MRData']['CircuitTable']['Circuits']),
        tap(circuits => this.circuits = circuits)
      );
  }
  refreshCircuit(circuit: string) { // non proprio necessario
    return this.formulaService.getCircuit(circuit)
      .pipe(
        map(c => c['MRData']['CircuitTable']['Circuits'][0]),
        tap(c => this.circuit = {
          circuitId: c.circuitId,
          url: c.url,
          circuitName: c.circuitName,
          location: c.Location
        })
      );
    /*this.formulaService.getCircuit(circuit)
      .pipe(
        map(loc => loc['MRData']['CircuitTable']['Circuits'][0]['Location']),
        tap(l => this.circuit.location = l)
      )*/
  }

  getLastSeasonDriver(circuit: string, position: number) {
    return this.formulaService.getLastSeasonResult(circuit, position)
      .pipe(
        tap(console.log),
        map(d => d['MRData']['RaceTable']['Races'][0]['Results'][0]['Driver'])
      );
  }

  refreshLastSeasonResult(circuit: string) {
    return concat(
      this.getLastSeasonDriver(circuit, 1),
      this.getLastSeasonDriver(circuit, 2),
      this.getLastSeasonDriver(circuit, 3)
    ).pipe(
      toArray(),
      tap(res => this.podium = res)
    );
  }
}
