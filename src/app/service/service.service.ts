import {Injectable} from '@angular/core';

import {CarService} from '../car/car.service';

import {Service} from './service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private carService: CarService) {
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

  deleteService(serviceId: number, carId: number) {
    const car = this.carService.getCar(carId);
    car.services.splice(serviceId, 1);
    this.carService.editCar(car, carId);
  }

  getServices(carId: number): Service[] {
    return this.carService.getCar(carId)['services'];
  }
}
