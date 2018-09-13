import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import {GuysService} from '../guys.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Guy} from '../guy.model';

@Component({
  selector: 'app-guy-edit',
  templateUrl: './guy-edit.component.html',
  styleUrls: ['./guy-edit.component.scss']
})
export class GuyEditComponent implements OnInit {
  guyId: number;
  guy: Guy;

  constructor(private guysService: GuysService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.guyId = +this.route.snapshot.params['guyId'];
    this.guy = this.guysService.getGuy(this.guyId);
  }

  onSubmit(f: NgForm) {
    const newGuy: Guy = {
      name: f.value.guyName,
      phone: f.value.phone,
      location: f.value.location
    };

    this.guysService.editGuy(newGuy, this.guyId);
    this.guysService.saveGuys().subscribe(
      () => {
        this.router.navigate(['/guys']);
      }
    );
  }

  onCancel() {
    this.router.navigate(['/guys']);
  }
}
