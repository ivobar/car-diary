import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from '../car.service';
import {Car} from '../car.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars: Car[];
  carsChanges: Subscription;
  noCars = true;

  constructor(private carServ: CarService) {
  }

  ngOnInit() {
    this.cars = this.carServ.getCars();
    if (this.cars.length === 0) {
      this.noCars = true;
    }
    this.carsChanges = this.carServ.carsChanged.subscribe(
      () => {
        this.cars = this.carServ.getCars();
        this.noCars = false;
      }
    );
  }

  ngOnDestroy() {
    this.carsChanges.unsubscribe();
  }

}
