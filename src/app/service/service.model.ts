import {Guy} from '../guys/guy.model';

export interface Service {
  description: string;
  date: Date;
  km: string;
  price: number;
  guy: Guy;
  imgPath: string;
}
