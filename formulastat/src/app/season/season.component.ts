import {Component, OnInit} from '@angular/core';
import {FormulastatService} from '../formulastat.service';
import {finalize, map, tap} from 'rxjs/operators';

import {Season} from '../dto/season';
import {Driver} from '../dto/driver';
import {Constructor} from '../dto/constructor';
import {merge, Observable} from 'rxjs';
import {Race} from '../dto/race';

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
  selectedYear: string;
  loading = true;
  constructor(private formulaService: FormulastatService) { }

  ngOnInit() {
    this.loading = true;
    merge(
      this.refreshSeasons(),
      this.refreshYearChamp('1990'),
      this.refreshYearConstructor('1990'),
      this.refreshNumberOfRace('1990')
    ).pipe(
      finalize(() => this.loading = false)
    ).subscribe();
  }
  selectChangeHandler(event: any) {
    // this.selectedYear = event.target.value;
    merge(
      this.refreshYearChamp(event.target.value),
      this.refreshYearConstructor(event.target.value),
      this.refreshNumberOfRace(event.target.value)
    ).subscribe();
    console.log(event.target.value);
  }
  refreshSeasons(): Observable<Season> {
    return this.formulaService.getSeasons()
      .pipe(
        tap(console.log),
        map(res => res['MRData']['SeasonTable']['Seasons']),
        tap(seasons => this.years = seasons)
      );
  }
  refreshYearChamp(year: string): Observable<Driver> {
    return this.formulaService.getYearChamp(year)
      .pipe(
        tap(console.log),
        map(d => d['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][0]['Driver']),
        tap(driver => this.champDriver = driver)
      );
  }
  refreshYearConstructor(year: string): Observable<Constructor> {
    return this.formulaService.getYearConstructor(year)
      .pipe(
        tap(console.log),
        map(c => c['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'][0]['Constructor']),
        tap(constructor => this.champConstructor = constructor)
      );
  }
  refreshNumberOfRace(year: string): Observable<Race> {
    return this.formulaService.getNumberOfRace(year)
      .pipe(
        tap(console.log),
        map(r => r['MRData']['RaceTable']['Races']),
        tap(r => this.races = r),
        tap( _ => this.racesLength = this.races.length )
      );
  }

}
