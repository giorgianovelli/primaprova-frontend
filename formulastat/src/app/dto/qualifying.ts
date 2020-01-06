import {Constructor} from './constructor';
import {Driver} from './driver';

export interface Qualifying {
  Constructor: Constructor;
  Driver: Driver;
  Q1: string;
  Q2: string;
  Q3: string;
  number: string;
  position: string;
}
