import {Circuit} from './circuit';
import {Qualifying} from './qualifying';

export interface Qualiresults {
  Circuit: Circuit;​​
  QualifyingResults: Qualifying[];
  date: string;
  raceName: string;
  round: string;
  season: string;
  time: string;
  url: string;
}
