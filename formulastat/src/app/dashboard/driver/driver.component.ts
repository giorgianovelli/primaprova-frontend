import { Component, OnInit } from '@angular/core';
import {FormulastatService} from '../../api/formulastat.service';
import {concat, merge} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {Driver} from '../../dto/driver';
import {Championship} from '../../dto/championship';
import {Season} from '../../dto/season';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  driversList: Driver[] = [];
  wins = [];
  championship: Championship[] = [];
  podium: number[] = [];
  driver: Driver;
  seasons: Season[] = [];
  loading = true;

  constructor(private formulaService: FormulastatService) { }

  ngOnInit() {
    this.refreshDrivers()
      .subscribe();
  }

  /**
   * refresh search by selected driver
   * @param driverId, selected driver {string}
   */
  private refresh(driverId: string) {
    this.loading = true;
    merge(
      this.refreshPodiumResult(driverId),
      this.refreshDriverInfo(driverId),
      this.refreshWorldChampion(driverId),
      this.refreshWorldChampion(driverId),
      this.refreshRacingSeasons(driverId)
    ).pipe(
      finalize(() => this.loading = false)
    ).subscribe();

  }

  /**
   * handle event from select list
   * @param event - event change from select
   */
  selectChangeHandler(event: any) {
    this.refresh(event.target.value);
  }

  /**
   * get list of drivers from service
   * @returns - {Observable<any>}
   */
  refreshDrivers() { // TODO lista solo di piloti correnti (tutti sono troppi: fare un filtro)
    return this.formulaService.getDrivers()
      .pipe(
        tap(console.log),
        map(d => d['MRData']['DriverTable']['Drivers']),
        tap(d => this.driversList = d)
      );
  }

  /**
   * get info of selected driver from service
   * @param driverId, {string}
   * @returns - {Observable<any>}
   */
  refreshDriverInfo(driverId: string) {
    return this.formulaService.getDriverInfo(driverId)
      .pipe(
        // tap(console.log),
        map(driver => driver['MRData']['DriverTable']['Drivers'][0]),
        tap(d => this.driver = d)
      );
  }

  /**
   * restituisce il numero di risultati conseguiti dal pilota nella posizione specificata
   * @param driverId, {string}
   * @param position, {number}
   * @returns - {Observable<any>}
   */
  getPodium(driverId: string, position: number) {
    return this.formulaService.getPodiumResult(driverId, position)
      .pipe(
        // tap(console.log),
        map(w => w['MRData']['RaceTable']['Races']),
        tap(vic => this.wins = vic),
        tap(_ => this.podium[position - 1] = this.wins.length)
      );
  }

  /**
   * restituisce il numero di risultati conseguiti dal pilota nelle posizioni di podio
   * @param driverId, {string}
   * @returns - {Observable<ObservedValueOf<Observable<any>>>}
   */
  refreshPodiumResult(driverId: string) {
    return concat(
      this.getPodium(driverId, 1),
      this.getPodium(driverId, 2),
      this.getPodium(driverId, 3)
    );
  }

  /**
   * get championship for selected driver
   * @param driverId, {string}
   * @returns - {Observable<any>}
   */
  refreshWorldChampion(driverId: string) {
    return this.formulaService.getWorldChampion(driverId)
      .pipe(
        // tap(console.log),
        map(w => w['MRData']['StandingsTable']['StandingsLists']),
        tap(c => this.championship = c)
      );
  }

  /**
   * restituisce le stagioni disputate dal pilota selezionato
   * @param driverId, {string}
   * @returns - {Observable<any>}
   */
  refreshRacingSeasons(driverId: string) {
    return this.formulaService.getRacingSeasons(driverId)
      .pipe(
        tap(console.log),
        map(year => year['MRData']['SeasonTable']['Seasons']),
        tap(s => this.seasons = s)
      );
  }


}
