import {Circuit} from './circuit';

export interface Race {
  circuit: Circuit;
  date: string;
  raceName: string;
  round: number;
  season: number;
  time: string;
  url: string;
}
