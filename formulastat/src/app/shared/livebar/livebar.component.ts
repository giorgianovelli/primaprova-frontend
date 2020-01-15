import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormulastatService} from '../../api/formulastat.service';
import {finalize, map, tap} from 'rxjs/operators';
import {Standing} from '../../dto/standing';
import {Result} from '../../dto/result';
import {merge} from 'rxjs';
import {LiveStandingMap} from '../../dto/livestandingmap';

@Component({
  selector: 'app-livebar',
  templateUrl: './livebar.component.html',
  styleUrls: ['./livebar.component.scss']
})
export class LivebarComponent implements OnInit {
  driverStanding: Standing[] = [];
  catchNgOnInit = new EventEmitter();
  podium: Result[] = [];
  livebarStanding: LiveStandingMap[] = [];
  loading = true;

  constructor(private formulaService: FormulastatService) {}

  ngOnInit() {
    this.loading = true;
    merge(
      this.getLastDriverStanding(),
      this.getLastSeasonPodium()
    ).pipe(
      finalize(() => {
        // this.catchNgOnInit.emit('ciao');
        this.finalizeCircuitCall();
      })
    ).subscribe();
  }

  finalizeCircuitCall() {
    this.showLiveStanding();
    this.loading = false;
  }

  /**
   * filtra classifica piloti
   */
  showLiveStanding() {
    this.driverStanding.forEach(
      driver => this.livebarStanding.push({driver: driver.Driver.driverId, points: driver.points}));
    // console.log(this.livebarStanding);
  }

  /**
   * restituisce la classifica piloti
   */
  getLastDriverStanding() {
    return this.formulaService.getLastDriverStanding()
      .pipe(
        // tap(console.log),
        map(ds => ds['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']),
        tap(driv => this.driverStanding = driv)
      );

  }

  /**
   * restituisce l'ultimo podio della stagione corrente
   * @returns - {Observable<any>}
   */
  getLastSeasonPodium() {
    return this.formulaService.getLastSeasonPodium()
      .pipe(
        // tap(console.log),
        map(res => res['MRData']['RaceTable']['Races'][0]['Results']),
        tap(podium => this.podium = podium)
      );
  }



}
