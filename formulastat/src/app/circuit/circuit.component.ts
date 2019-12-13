import { Component, OnInit } from '@angular/core';
import {finalize, map, switchMap, tap, toArray} from 'rxjs/operators';
import {concat, from, merge, Observable} from 'rxjs';

import {FormulastatService} from '../formulastat.service';
import {Driver} from '../dto/driver';
import {Raceresult} from '../dto/raceresult';
import {Circuit} from '../dto/circuit';



@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss']
})
export class CircuitComponent implements OnInit {
  circuits: Circuit[] = [];
  circuit: Circuit;
  podium: Driver[] = [];
  winnersForCircuit: Raceresult[] = [];
  drivers = [];
  constructors = [];
  loading = true;

  constructor(private formulaService: FormulastatService) { }

  ngOnInit() {
    this.refreshCircuits().subscribe();
  }

  /**
   * refresh search by selected circuit
   * @param circuit, selected circuit {string}
   */
  refresh(circuit: string) {
    this.loading = true;
    this.winnersForCircuit = [];
    merge(
      this.refreshCircuit(circuit),
      this.refreshLastSeasonResult(circuit),
      this.refreshWinnerByCircuit(circuit)
    ).pipe(
      finalize(() => this.finalizeCircuitCall())
    ).subscribe();
  }

  /**
   * create lists of drivers and constructors -
   * that have won on selected circuit
   */
  finalizeCircuitCall() {
    this.showDriver();
    this.showConstructor();
    this.loading = false;
  }

  /**
   * create array
   * @param firstTab, list of string
   * @returns -{any}
   */
  createtab(firstTab) {
    const tab = firstTab.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    const mapAsc = ([...tab.entries()].sort((a, b) => b[1] - a[1]));
    return mapAsc;
  }

  /**
   * create list of drivers with number of victories
   * from all winners in selected circuit
   */
  showDriver() {
    const drivers = [];
    this.winnersForCircuit
      .forEach(result => result.Results
        .forEach(resultInto => drivers.push(resultInto.Driver)));
    const driverId = drivers.map(d => d.driverId);
    this.drivers = this.createtab(driverId);
    console.log(this.drivers);
  }

  /**
   * create list of constructors with number of victories
   * from all winners in selected circuit
   */
  showConstructor() {
    const constructors = [];
    this.winnersForCircuit
      .forEach(result => result.Results
        .forEach(resultInto => constructors.push(resultInto.Constructor))
      );
    const consId = constructors.map(cons => cons.name);
    this.constructors = this.createtab(consId);
    console.log(this.constructors);
  }

  /**
   * handle event from select list
   * @param event - event change from select
   */
  selectChangeHandler(event: any) {
    this.refresh(event.target.value);
  }

  /**
   * get list of circuits from service
   * @returns list of circuits {Observable<Circuit>}
   */
  refreshCircuits(): Observable<Circuit> {
    return this.formulaService.getCircuits()
      .pipe(
        // tap(console.log),
        map(c => c['MRData']['CircuitTable']['Circuits']),
        tap(circuits => this.circuits = circuits)
      );
  }

  /**
   * get info of selected circuit from service
   * @param  circuit, selected circuit {string}
   * @returns selected circuit info {Observable<Circuit>}
   */
  refreshCircuit(circuit: string): Observable<Circuit> {
    return this.formulaService.getCircuit(circuit)
      .pipe(
        map(c => c['MRData']['CircuitTable']['Circuits'][0]),
        tap(c => this.circuit = {
          circuitId: c.circuitId,
          url: c.url,
          circuitName: c.circuitName,
          Location: c.Location
        })
      );
  }

  /**
   * get driver in podium position for selected circuit
   * @param circuit, selected circuit {string}
   * @param position, selected podium position {number}
   * @returns driver info in podium position {Observable<Driver>}
   */
  getLastSeasonDriver(circuit: string, position: number): Observable<Driver> {
    return this.formulaService.getLastSeasonResult(circuit, position)
      .pipe(
        // tap(console.log),
        map(d => d['MRData']['RaceTable']['Races'][0]['Results'][0]['Driver'])
      );
  }

  /**
   * get list of  podium drivers
   * @param circuit, selected circuit {string}
   * @returns array of podium drivers {Observable<any>}
   */
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

  /**
   * get list of results for all seasons, for selected circuit
   * @param circuitId, selected circuit {string}
   * @returns list of results for all seasons {Observable<Raceresult>}
   */
  refreshWinnerByCircuit(circuitId: string) {
    return this.formulaService.getWinnerDriverByCircuit(circuitId)
      .pipe(
        tap(console.log),
        switchMap(res => from(res['MRData']['RaceTable']['Races'])),
        tap((w: Raceresult) => {this.winnersForCircuit.push(w); })
      );
  }
}
