import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSer: AuthService) {
  }

  ngOnInit() {
  }

  onUserLogin(form: NgForm) {
    const user = {
      email: form.value.email,
      password: form.value.password
    };
    this.authSer.loginUser(user);
  }

}
