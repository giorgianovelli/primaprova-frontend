import {Driver} from './driver';
import {Constructor} from './constructor';

export interface Standing {
  wins: string;
  positionText: string;
  position: string;
  points: string;
  Driver: Driver;
  Constructors: Constructor;
}
