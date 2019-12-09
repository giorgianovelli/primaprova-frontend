import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Season} from './dto/season';
import {Driver} from './dto/driver';
import {Constructor} from './dto/constructor';
import {Race} from './dto/race';


@Injectable({
  providedIn: 'root'
})
export class FormulastatService {
  private formulaUrl = 'https://ergast.com/api/f1';

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.formulaUrl}/seasons.json?limit=30&offset=40`);

  }
  getYearChamp(year: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.formulaUrl}/${year}/driverStandings/1.json`);
  }
  getYearConstructor(year: number): Observable<Constructor> {
    return this.http.get<Constructor>(`${this.formulaUrl}/${year}/constructorStandings/1.json`);
  }
  getNumberOfRace(year: number): Observable<Race> {
    return this.http.get<Race>(`${this.formulaUrl}/${year}.json`);
  }
}

