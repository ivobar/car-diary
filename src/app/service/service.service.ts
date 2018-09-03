import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CarService} from '../car/car.service';

import {Service} from './service.model';
import {Guy} from './guy/guy.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private guys: Guy[] = [];

  constructor(private carService: CarService,
              private httpClient: HttpClient) {
  }

  loadGuys(): Observable<Guy[]> {
    return this.httpClient.get<Guy[]>('https://car-diary-bb6a2.firebaseio.com/guys.json');
  }

  saveGuys(): Observable<Guy[]> {
    return this.httpClient.put<Guy[]>('https://car-diary-bb6a2.firebaseio.com/guys.json', this.guys);
  }

  setGuys(guys: Guy[]): void {
    this.guys = [...guys];
  }

  addGuy(guy: Guy): void {
    this.guys = [...this.guys, guy];
  }

  getGuys(): Guy[] {
    return this.guys.slice();
  }

  addService(service: Service, carId: number): void {
    const cars = this.carService.getCars();
    cars[carId].services.push(service);
    this.carService.setCars(cars);
  }

  editService(service: Service, carId: number, serviceId: number): void {
    const cars = this.carService.getCars();
    cars[carId].services[serviceId] = service;
    this.carService.setCars(cars);
  }

  getServices(carId: number): Service[] {
    return this.carService.getCar(carId)['services'];
  }
}
