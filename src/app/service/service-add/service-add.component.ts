import {Component, OnInit, ViewChild} from '@angular/core';
import {Guy} from '../../guys/guy.model';
import {ServiceService} from '../service.service';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import {CarService} from '../../car/car.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GuysService} from '../../guys/guys.service';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  carId: number;
  guys: Guy[];
  selectedGuyName: string;

  constructor(private route: ActivatedRoute,
              private serService: ServiceService,
              private carService: CarService,
              private guysService: GuysService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.carId = +this.route.snapshot.params['id'];
    this.guysService.loadGuys().subscribe(
      (guys: Guy[]) => {
        if (guys !== null) {
          this.guysService.setGuys(guys);
          this.guys = [...this.guysService.getGuys()];
          this.selectedGuyName = this.guys[0]['name'];
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
      guy,
      imgPath: this.form.value.imgPath
    };
    this.serService.addService(newService, this.carId);
    this.carService.saveCars().subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.route});
      }
    );
  }

  onCancel() {
    this.location.back();
  }
}
