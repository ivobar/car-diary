import {Component, OnInit} from '@angular/core';
import {CarService} from '../car.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {
  editMode = false;

  constructor(private carSer: CarService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSave(form: NgForm) {
    const car = {
      name: form.value.carName,
      km: form.value.carKm,
      driver: form.value.driver,
      carImg: form.value.carImg,
      services: [],
      insurances: []
    };
    this.carSer.setCar(car);
    this.carSer.saveCars().subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }
}
