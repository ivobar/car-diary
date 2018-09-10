import {Component, OnInit} from '@angular/core';
import {CarService} from '../car.service';
import {Car} from '../car.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-car-head',
  templateUrl: './car-head.component.html',
  styleUrls: ['./car-head.component.scss']
})
export class CarHeadComponent implements OnInit {
  car: Car;
  alertCount = 0;
  carId: number;

  constructor(private carServ: CarService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.carId = +this.route.snapshot.params['id'];
    this.car = this.carServ.getCar(this.carId);
    for (const ins of this.car.insurances) {
      if (ins.alert) {
        this.alertCount++;
      }
    }
  }

}
