import {Component, OnInit} from '@angular/core';
import {CarService} from '../car.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {
  editMode = false;
  form: FormGroup;

  constructor(private carSer: CarService,
              private router: Router) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      'carName': new FormControl(null, [Validators.required]),
      'carKm': new FormControl(null, [Validators.required]),
      'driver': new FormControl(null, [Validators.required]),
      'carImg': new FormControl(null, [Validators.required]),
      'insurances': new FormArray([]),
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
    this.carSer.setCar(car);
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
}
