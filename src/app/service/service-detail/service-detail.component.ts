import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../service.model';
import {ServiceService} from '../service.service';
import {CarService} from '../../car/car.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  serviceId: number;
  carId: number;
  service: Service;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private serService: ServiceService,
              private router: Router,
              private carService: CarService) {
  }

  ngOnInit() {
    this.serviceId = +this.route.snapshot.params['serviceId'];
    this.carId = +this.route.snapshot.params['id'];
    this.service = this.serService.getServices(this.carId)[this.serviceId];
  }

  onGoBack() {
    this.location.back();
  }

  onDeleteService() {
    this.serService.deleteService(this.serviceId, this.carId);
    this.carService.saveCars().subscribe(() => {
      this.router.navigate(['../../'], {relativeTo: this.route});
    });
  }
}
