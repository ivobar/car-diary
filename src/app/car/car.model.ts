import {Insurance} from '../shared/insurance.model';
import {Service} from '../service/service.model';

export interface Car {
  name: string;
  km: string;
  driver: string;
  carImg: string;
  services: Service[];
  insurances: Insurance[];
}
