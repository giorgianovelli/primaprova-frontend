import {Circuit} from './circuit';
import {Result} from './result';

export interface Raceresult {
  date: string;
  raceName: string;
  round: string;
  season: string;
  url: string;
  Circuit: Circuit;
  Results: Result[];
}
