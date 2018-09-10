import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  pass = '';
  repass = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onUserRegister(form: NgForm) {
    const user = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.registerUser(user);
  }

}
