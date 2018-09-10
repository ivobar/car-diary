import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {User} from './user.model';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string;
  token: string;
  authStatusChanged = new Subject();

  constructor(private router: Router) {
  }

  registerUser(user: User): void {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(
        () => {
          this.userId = firebase.auth().currentUser.uid;
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                this.authStatusChanged.next();
                this.router.navigate(['/cars']).catch(error => console.log(error.message));
              }
            )
            .catch(
              (err) => {
                alert(err.message);
              }
            );
        })
      .catch(
        (err) => {
          alert(err.message);
        }
      );
  }

  loginUser(user: User): void {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(
        () => {
          this.userId = firebase.auth().currentUser.uid;
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                this.authStatusChanged.next();
                this.router.navigate(['/cars']).catch(error => console.log(error.message));
              }
            )
            .catch(
              (err) => {
                alert(err.message);
              }
            );
        })
      .catch(
        (err) => {
          alert(err.message);
        }
      );
  }

  signOut() {
    firebase.auth().signOut()
      .then(
        () => {
          this.userId = '';
          this.token = '';
          this.authStatusChanged.next();
          this.router.navigate(['/'])
            .catch((err) => {
              alert(err.message);
            });
        }
      )
      .catch(
        (err) => {
          alert(err.message);
        }
      );

  }

  isAuthenticated(): boolean {
    return !!this.userId;
  }

}
