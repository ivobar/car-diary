import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
  carsSavedSub: Subscription;

  constructor(private carServ: CarService,
              private router: Router) {
  }

  ngOnInit() {
    this.cars = this.carServ.getCars();
    this.carsChanges = this.carServ.carsChanged.subscribe(
      () => {
        this.cars = this.carServ.getCars();
      }
    );
  }

  onDeleteCar(id: number) {
    this.carServ.deleteCar(id);
    this.carsSavedSub = this.carServ.saveCars().subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  ngOnDestroy() {
    this.carsChanges.unsubscribe();
  }
}
