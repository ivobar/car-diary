import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from './car/car.service';
import {Car} from './car/car.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  carSub: Subscription;

  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.carSub = this.carService.loadCars().subscribe(
      (data: Car[]) => {
        this.carService.setCars(data);
      }
    );
  }

  ngOnDestroy() {
    this.carSub.unsubscribe();
  }
}
