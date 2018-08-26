import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-car-head',
  templateUrl: './car-head.component.html',
  styleUrls: ['./car-head.component.scss']
})
export class CarHeadComponent implements OnInit {
  @Input() alerts;
  @Input() car;
  alertCount = 0;

  constructor() {
  }

  ngOnInit() {
    for (const alert of this.alerts) {
      if (alert) {
        this.alertCount++;
      }
    }
  }

}
