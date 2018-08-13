import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from '../car.service';
import {Car} from '../car.model';
import {Subscription} from 'rxjs';
import {log} from 'util';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars: Car[];
  carsChanges: Subscription;

  constructor(private carServ: CarService) {
  }

  ngOnInit() {
    this.cars = this.carServ.getCars();
    if (this.cars.length === 0) {
      console.log('NO CARS');
    }
    this.carsChanges = this.carServ.carsChanged.subscribe(
      () => {
        this.cars = this.carServ.getCars();
      }
    );
  }

  ngOnDestroy() {
    this.carsChanges.unsubscribe();
  }

}
