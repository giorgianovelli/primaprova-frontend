import {Driver} from './driver';
import {Constructor} from './constructor';
import {Time} from './time';

export interface Result {
  grid: string;
  laps: string;
  number: string;
  points: string;
  position: string;
  positionText: string;
  status: string;
  Constructor: Constructor;
  Driver: Driver;
  Time: Time;
}
