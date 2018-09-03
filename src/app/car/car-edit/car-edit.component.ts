import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {CarService} from '../car.service';
import {Car} from '../car.model';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {
  editMode = false;
  form: FormGroup;
  id: number;

  constructor(private carSer: CarService,
              private router: Router,
              private route: ActivatedRoute,
              private lovation: Location) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.editMode = !!this.route.snapshot.params['id'];
    this.initializeForm();
  }

  initializeForm() {
    let car: Car;
    if (this.editMode) {
      car = this.carSer.getCar(this.id);
    }
    const carNameInit = this.editMode ? car.name : null;
    const carKmInit = this.editMode ? car.km : null;
    const driverInit = this.editMode ? car.driver : null;
    const carImgInit = this.editMode ? car.carImg : null;
    const insurancesInit = new FormArray([]);
    if (this.editMode) {
      for (const ins of car.insurances) {
        insurancesInit.push(
          new FormGroup({
            'insName': new FormControl({value: ins.insName, disabled: true}),
            'insDate': new FormControl({value: ins.insDate, disabled: true})
          })
        );
      }
    }

    this.form = new FormGroup({
      'carName': new FormControl(carNameInit, [Validators.required]),
      'carKm': new FormControl(carKmInit, [Validators.required]),
      'driver': new FormControl(driverInit, [Validators.required]),
      'carImg': new FormControl(carImgInit, [Validators.required]),
      'insurances': insurancesInit,
      'newInsurance': new FormGroup({
        'newInsName': new FormControl(null),
        'newInsDate': new FormControl(null)
      })
    });
  }

  onSave() {
    const car = {
      name: this.form.get('carName').value,
      km: this.form.get('carKm').value,
      driver: this.form.get('driver').value,
      carImg: this.form.get('carImg').value,
      services: [],
      insurances: this.form.get('insurances').value
    };
    if (this.editMode) {
      this.carSer.editCar(car, this.id);
    } else {
      this.carSer.setCar(car);
    }
    this.carSer.saveCars().subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  onAddInsurance() {
    const insuranceControl = new FormGroup({
      'insName': new FormControl({value: this.form.get('newInsurance.newInsName').value, disabled: true}),
      'insDate': new FormControl({value: this.form.get('newInsurance.newInsDate').value, disabled: true})
    });
    (<FormArray>this.form.get('insurances')).push(insuranceControl);
    this.form.get('newInsurance').reset();
  }

  onRemoveInsurance(i: number) {
    (<FormArray>this.form.get('insurances')).removeAt(i);
  }

  onCancel() {
    this.lovation.back();
  }
}
