import {Component, OnDestroy, OnInit} from '@angular/core';
import {Service} from '../service.model';
import {ServiceService} from '../service.service';
import {ActivatedRoute} from '@angular/router';
import {CarService} from '../../car/car.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit, OnDestroy {
  services: Service[];
  subs: Subscription;
  showServs = false;

  constructor(private serService: ServiceService,
              private route: ActivatedRoute,
              private carSer: CarService) {
  }

  ngOnInit() {
    this.services = this.serService.getServices(+this.route.snapshot.params['id']);
    this.showServs = this.services.length !== 0;
    this.subs = this.carSer.carsAdded.subscribe(
      () => {
        this.services = this.serService.getServices(+this.route.snapshot.params['id']);
        this.showServs = this.services.length !== 0;
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
