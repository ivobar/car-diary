import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';
import {GuysService} from '../../guys/guys.service';
import {CarService} from '../../car/car.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  isLogged = false;
  authStatChanSub: Subscription;

  constructor(private authService: AuthService,
              private guysService: GuysService,
              private carsService: CarService) {
  }

  ngOnInit() {
    this.authStatChanSub = this.authService.authStatusChanged
      .subscribe(
        () => {
          this.isLogged = this.authService.isAuthenticated();
        }
      );
  }

  onLogout() {
    this.guysService.clearGuys();
    this.carsService.clearCars();
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.authStatChanSub.unsubscribe();
  }

}
