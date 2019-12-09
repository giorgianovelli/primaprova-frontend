import { Component, OnInit } from '@angular/core';
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
  loading = true;
  constructor(private formulaService: FormulastatService) { }

  ngOnInit() {
    this.loading = true;
    merge(
      this.refreshSeasons(),
      this.refreshYearChamp(),
      this.refreshYearConstructor(),
      this.refreshNumberOfRace()
    ).pipe(
      finalize(() => this.loading = false)
    ).subscribe();
  }
  refreshSeasons(): Observable<Season> {
    return this.formulaService.getSeasons()
      .pipe(
        tap(console.log),
        map(res => res['MRData']['SeasonTable']['Seasons']),
        tap(seasons => this.years = seasons)
      );
  }
  refreshYearChamp(): Observable<Driver> {
    return this.formulaService.getYearChamp(2007)
      .pipe(
        tap(console.log),
        map(d => d['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][0]['Driver']),
        tap(driver => this.champDriver = driver)
      );
  }
  refreshYearConstructor(): Observable<Constructor> {
    return this.formulaService.getYearConstructor(2007)
      .pipe(
        tap(console.log),
        map(c => c['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'][0]['Constructor']),
        tap(constructor => this.champConstructor = constructor)
      );
  }
  refreshNumberOfRace(): Observable<Race> {
    return this.formulaService.getNumberOfRace(2007)
      .pipe(
        tap(console.log),
        map(r => r['MRData']['RaceTable']['Races']),
        tap(r => this.races = r),
        tap( _ => this.racesLength = this.races.length )
      );
  }

}
