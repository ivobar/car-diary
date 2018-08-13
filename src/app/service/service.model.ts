import {Guy} from './guy/guy.model';

export interface Service {
  description: string;
  date: Date;
  km: string;
  price: number;
  guy: Guy;
}
