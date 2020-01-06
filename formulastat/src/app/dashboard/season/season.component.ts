import {Component, OnInit} from '@angular/core';
import {FormulastatService} from '../../api/formulastat.service';
import {finalize, map, switchMap, tap} from 'rxjs/operators';

import {Season} from '../../dto/season';
import {Driver} from '../../dto/driver';
import {Constructor} from '../../dto/constructor';
import {from, merge, Observable} from 'rxjs';
import {Race} from '../../dto/race';
import {Qualiresults} from '../../dto/qualiresults';
import {Qualifying} from '../../dto/qualifying';
import {Winmap} from '../../dto/winmap';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {
  years: Season[] = [];
  champDriver: Driver;
  champConstructor: Constructor;
  races: Race[] = [];
  racesLength: number;
  loading = true;
  qualiResults: Qualiresults[] = [];
  qualifying: Driver[] = [];
  poleTab: Winmap[] = [];
  constructor(private formulaService: FormulastatService) { }

  ngOnInit() {
    this.refreshSeasons()
      .subscribe();
  }

  /**
   * refresh search by selected year
   * @param year, selected year {string}
   */
  refresh(year: string) {
    this.loading = true;
    this.qualiResults = [];
    this.qualifying = [];
    this.poleTab = [];
    merge(
      this.refreshYearChamp(year),
      this.refreshYearConstructor(year),
      this.refreshNumberOfRace(year),
      this.refreshPolePosition(year)
    ).pipe(
      finalize(() => this.finalizeCall())
    ).subscribe();
  }
  finalizeCall() {
    this.getPoleman();
    this.loading = false;
  }
  /**
   * handle event from select list
   * @param event - event change from select
   */
  selectChangeHandler(event: any) {
    this.refresh(event.target.value);
  }

  /**
   * get list of seasons from formulaService
   * @returns list of seasons {Observable<Season>}
   */
  refreshSeasons(): Observable<Season> {
    return this.formulaService.getSeasons()
      .pipe(
        // tap(console.log),
        map(res => res['MRData']['SeasonTable']['Seasons']),
        tap(seasons => this.years = seasons)
      );
  }

  /**
   * get driver world champion for selected year from formulaService
   * @param year, selected year {string}
   * @returns world champion driver {Observable<Driver>}
   */
  refreshYearChamp(year: string): Observable<Driver> {
    return this.formulaService.getYearChamp(year)
      .pipe(
        // tap(console.log),
        map(d => d['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][0]['Driver']),
        tap(driver => this.champDriver = driver)
      );
  }

  /**
   * get constructor world champion for selected year from formulaService
   * @param year, selected year {string}
   * @returns world champion constructor {Observable<Constructor>}
   */
  refreshYearConstructor(year: string): Observable<Constructor> {
    return this.formulaService.getYearConstructor(year)
      .pipe(
        // tap(console.log),
        map(c => c['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'][0]['Constructor']),
        tap(constructor => this.champConstructor = constructor)
      );
  }

  /**
   * get number of race for selected year from formulaService
   * @param year, selected year {string}
   * @returns all season races{Observable<Race>}
   */
  refreshNumberOfRace(year: string): Observable<Race> {
    return this.formulaService.getNumberOfRace(year)
      .pipe(
        // tap(console.log),
        map(r => r['MRData']['RaceTable']['Races']),
        tap(r => this.races = r),
        tap( _ => this.racesLength = this.races.length )
      );
  }

  getPoleman() {
    this.qualiResults
      .forEach(result => result.QualifyingResults
        .forEach(res => this.qualifying.push(res.Driver))
      );
    const mapAsc = new Map([...(
      this.qualifying
      .map(d => d.driverId)
      .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()
      )).entries()].sort((a, b) => b[1] - a[1]));
    mapAsc.forEach((val, key) => {
      this.poleTab.push({name: key, number: val});
    });
    console.log(this.poleTab);
  }

  refreshPolePosition(year: string) {
    return this.formulaService.getPolePosition(year)
      .pipe(
        // tap(console.log),
        switchMap(res => from(res['MRData']['RaceTable']['Races'])),
        tap((r: Qualiresults) => this.qualiResults.push(r)),
        // tap(console.log)
      );
  }

}
