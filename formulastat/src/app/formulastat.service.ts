import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Season} from './dto/season';
import {Driver} from './dto/driver';
import {Constructor} from './dto/constructor';
import {Race} from './dto/race';
import {Circuit} from './dto/circuit';


@Injectable({
  providedIn: 'root'
})
export class FormulastatService {
  private formulaUrl = 'https://ergast.com/api/f1';

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.formulaUrl}/seasons.json?limit=30&offset=40`);

  }
  // ricerca per stagione
  getYearChamp(year: string): Observable<Driver> {
    return this.http.get<Driver>(`${this.formulaUrl}/${year}/driverStandings/1.json`);
  }
  getYearConstructor(year: string): Observable<Constructor> {
    return this.http.get<Constructor>(`${this.formulaUrl}/${year}/constructorStandings/1.json`);
  }
  getNumberOfRace(year: string): Observable<Race> {
    return this.http.get<Race>(`${this.formulaUrl}/${year}.json`);
  }

  // ricerca per circuito
  getCircuits(): Observable<Circuit> {
    return this.http.get<Circuit>(`${this.formulaUrl}/current/circuits.json`);
  }
  getCircuit(circuitid: string): Observable<Circuit> {
    return this.http.get<Circuit>(`${this.formulaUrl}/circuits/${circuitid}.json`);
  }
  getLastSeasonResult(circuitid: string, position: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.formulaUrl}/current/circuits/${circuitid}/results/${position}.json`);
  }
  getWinnerDriverByCircuit(circuitid: string): Observable<any> { // TODO simile a quella sopra
    return this.http.get(`${this.formulaUrl}/circuits/${circuitid}/results/1.json`);
  }
  /*getFastestLapTime(circuitid: string): Observable<any> { //TODO
    return this.http.get(`${this.formulaUrl}/fastest/1/circuits/${circuitid}.json`);
  }*/

}

