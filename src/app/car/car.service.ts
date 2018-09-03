import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

import {Car} from './car.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [];

  carsChanged = new Subject();
  carsAdded = new Subject();

  constructor(private httpClient: HttpClient) {
  }

  loadCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>('https://car-diary-bb6a2.firebaseio.com/cars.json');
  }

  saveCars(): Observable<Car[]> {
    return this.httpClient.put<Car[]>('https://car-diary-bb6a2.firebaseio.com/cars.json', this.cars);
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
    this.cars[id] = { ...car };
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
