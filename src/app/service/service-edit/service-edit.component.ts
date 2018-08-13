import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Guy} from '../guy/guy.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../service.service';
import {CarService} from '../../car/car.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  editMode = false;
  carId: number;
  guys: Guy[];
  selectedGuyName: string;

  constructor(private route: ActivatedRoute,
              private serService: ServiceService,
              private carService: CarService,
              private router: Router) {
  }

  ngOnInit() {
    this.carId = +this.route.snapshot.params['id'];
    this.serService.loadGuys().subscribe(
      (guys: Guy[]) => {
        if (guys !== null) {
          this.serService.setGuys(guys);
          this.guys = [...this.serService.getGuys()];
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
      guy
    };
    this.serService.addService(newService, this.carId);
    this.carService.saveCars().subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.route});
      }
    );
  }

  onCancel() {
  }
}
