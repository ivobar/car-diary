import { Component, OnInit } from '@angular/core';
import {Car} from '../car.model';
import {CarService} from '../car.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {
  car: Car;
  carId: number;

  constructor(private carService: CarService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.carId = +this.route.snapshot.params['id'];
    this.car = this.carService.getCar(this.carId);
  }

}
