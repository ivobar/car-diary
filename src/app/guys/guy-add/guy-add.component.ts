import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {Subscription} from 'rxjs';

import {GuysService} from '../guys.service';

@Component({
  selector: 'app-guy-add',
  templateUrl: './guy-add.component.html',
  styleUrls: ['./guy-add.component.scss']
})
export class GuyAddComponent implements OnInit, OnDestroy {
  sub: Subscription;

  constructor(private guysService: GuysService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const guy = {
      name: form.value.guyName,
      phone: form.value.phone,
      location: form.value.location
    };
    this.guysService.addGuy(guy);
    this.sub = this.guysService.saveGuys().subscribe(
      () => {
        this.router.navigate(['/guys/list']);
      }
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onCancel() {
    this.location.back();
  }

}
