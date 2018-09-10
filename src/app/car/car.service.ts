import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Car} from './car.model';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [];

  carsChanged = new Subject();
  carsAdded = new Subject();

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  loadCars(): Observable<Car[]> {
    const userId = this.authService.userId;
    const token = this.authService.token;
    return this.httpClient.get<Car[]>(`https://car-diary-bb6a2.firebaseio.com/users/${userId}/cars.json?auth=${token}`);
  }

  saveCars(): Observable<Car[]> {
    const userId = this.authService.userId;
    const token = this.authService.token;
    return this.httpClient.put<Car[]>(`https://car-diary-bb6a2.firebaseio.com/users/${userId}/cars.json?auth=${token}`, this.cars);
  }

  setCars(cars: Car[]) {
    for (const car of cars) {
      if (!car.insurances) {
        car.insurances = [];
      }
      if (!car.services) {
        car.services = [];
      }
      for (const ins of car.insurances) {
        ins.alert = this.getDaysDifference(ins.insDate);
      }
    }
    this.cars = [...cars];
    if (this.cars.length !== 0) {
      this.carsAdded.next();
      this.carsChanged.next();
    }
  }

  setCar(car: Car) {
    for (const ins of car.insurances) {
      ins.alert = this.getDaysDifference(ins.insDate);
    }
    this.cars.push(car);
    this.carsChanged.next();
  }

  getCars(): Car[] {
    return this.cars.slice();
  }

  getCar(id: number): Car {
    return {...this.cars[id]};
  }

  editCar(car: Car, id: number) {
    for (const ins of car.insurances) {
      ins.alert = this.getDaysDifference(ins.insDate);
    }
    this.cars[id] = {...car};
  }

  deleteCar(id: number): void {
    this.cars.splice(id, 1);
    this.carsChanged.next();
  }

  getDaysDifference(date: Date): boolean {
    const insDate = new Date(date);
    const daysLeft = (insDate.valueOf() - Date.now()) / 1000 / 60 / 60 / 24;
    return daysLeft < 10;
  }
}
