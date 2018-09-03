import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import {Guy} from '../guy/guy.model';
import {Service} from '../service.model';

import {ServiceService} from '../service.service';
import {CarService} from '../../car/car.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  carId: number;
  serviceId: number;
  guys: Guy[];
  selectedGuyName: string;
  serviceToEdit: Service;

  constructor(private route: ActivatedRoute,
              private serService: ServiceService,
              private carService: CarService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.carId = +this.route.snapshot.params['id'];
    this.serviceId = +this.route.snapshot.params['serviceId'];
    this.serviceToEdit = this.serService.getServices(this.carId)[this.serviceId];
    this.selectedGuyName = this.serviceToEdit.guy.name;
    this.serService.loadGuys().subscribe(
      (guys: Guy[]) => {
        if (guys !== null) {
          this.serService.setGuys(guys);
          this.guys = [...this.serService.getGuys()];
        } else {
          this.guys = [];
        }
      }
    );
  }

  onSubmit() {
    const guy = this.guys.filter((g) => g.name === this.selectedGuyName)[0];
    const newService = {
      description: this.form.value.description,
      date: new Date(this.form.value.date),
      km: this.form.value.km,
      price: this.form.value.price,
      guy
    };
    this.serService.editService(newService, this.carId, this.serviceId);
    this.carService.saveCars().subscribe(
      () => {
        this.router.navigate(['../../'], {relativeTo: this.route});
      }
    );
  }

  onCancel() {
    this.location.back();
  }
}
