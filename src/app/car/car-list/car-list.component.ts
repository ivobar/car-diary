import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CarService} from '../car.service';
import {Car} from '../car.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {User} from 'firebase';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  carsChanges: Subscription;
  carsSavedSub: Subscription;
  carSub: Subscription;

  constructor(private carServ: CarService,
              private router: Router) {
  }

  ngOnInit() {
    this.carSub = this.carServ.loadCars().subscribe(
      (data: Car[]) => {
        if (data !== null) {
          this.carServ.setCars(data);
          this.cars = this.carServ.getCars();
        }
      }
    );
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
    this.carSub.unsubscribe();
  }
}
