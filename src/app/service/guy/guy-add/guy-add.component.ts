import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {ServiceService} from '../../service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-guy-add',
  templateUrl: './guy-add.component.html',
  styleUrls: ['./guy-add.component.scss']
})
export class GuyAddComponent implements OnInit, OnDestroy {
  sub: Subscription;

  constructor(private serService: ServiceService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const guy = {
      name: form.value.guyName,
      phone: form.value.phone,
      location: form.value.location
    };
    this.serService.addGuy(guy);
    this.sub = this.serService.saveGuys().subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
