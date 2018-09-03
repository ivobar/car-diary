import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  serviceId: number;

  constructor(private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceId = +this.route.snapshot.params['serviceId'];
  }

  onGoBack() {
    this.location.back();
  }
}
