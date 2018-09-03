import {Component, OnInit} from '@angular/core';
import {Car} from '../car.model';
import {CarService} from '../car.service';
import {ActivatedRoute} from '@angular/router';
import {Service} from '../../service/service.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {
  car: Car;
  carId: number;
  services: Service[];

  constructor(private carService: CarService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.carId = +this.route.snapshot.params['id'];
    this.car = this.carService.getCar(this.carId);
    this.services = this.car.services
      .slice(0)
      .sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        } else if (a.date < b.date) {
          return 1;
        }
        return 0;
      })
      .slice(0, 5);
  }
}
