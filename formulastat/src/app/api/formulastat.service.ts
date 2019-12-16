import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Season} from '../dto/season';
import {Driver} from '../dto/driver';
import {Constructor} from '../dto/constructor';
import {Race} from '../dto/race';
import {Circuit} from '../dto/circuit';
import {Raceresult} from '../dto/raceresult';
import {Championship} from '../dto/championship';


@Injectable({
  providedIn: 'root'
})
export class FormulastatService {
  private formulaUrl = 'https://ergast.com/api/f1';

  constructor(private http: HttpClient) { }

  // ricerca per stagione
  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.formulaUrl}/seasons.json?limit=30&offset=40`);

  }
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
  getWinnerDriverByCircuit(circuitid: string): Observable<Raceresult> { // TODO simile a quella sopra
    return this.http.get<Raceresult>(`${this.formulaUrl}/circuits/${circuitid}/results/1.json?limit=100`);
  }
  /*getFastestLapTime(circuitid: string): Observable<any> { //TODO
    return this.http.get(`${this.formulaUrl}/fastest/1/circuits/${circuitid}.json`);
  }*/

  // ricerca per pilota
  getDrivers(): Observable<Driver> {
    return this.http.get<Driver>(`${this.formulaUrl}/current/drivers.json`);
  }
  getDriverInfo(driverId: string): Observable<Driver> {
    return this.http.get<Driver>(`${this.formulaUrl}/drivers/${driverId}.json`);
  }
  getPodiumResult(driverId: string, position: number): Observable<any> {
    return this.http.get<Raceresult>(`${this.formulaUrl}/drivers/${driverId}/results/${position}.json?limit=100`);
  }
  getWorldChampion(driverId: string): Observable<Championship> {
    return this.http.get<Championship>(`${this.formulaUrl}/drivers/${driverId}/driverStandings/1.json`);
  }
  getRacingSeasons(driverId: string): Observable<Season> {
    return this.http.get<Season>(`${this.formulaUrl}/drivers/${driverId}/seasons.json`);
  }

  // live panel
  getLastDriverStanding() {
    return this.http.get(`${this.formulaUrl}/current/driverStandings.json`);
  }


}

