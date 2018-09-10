import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Guy} from './guy.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuysService {
  guys: Guy[];
  guysChanged = new Subject();

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  loadGuys(): Observable<Guy[]> {
    return this.httpClient.get<Guy[]>(`https://car-diary-bb6a2.firebaseio.com/users/${this.authService.userId}/guys.json?auth=${this.authService.token}`);
  }

  saveGuys(): Observable<Guy[]> {
    return this.httpClient.put<Guy[]>(`https://car-diary-bb6a2.firebaseio.com/users/${this.authService.userId}/guys.json?auth=${this.authService.token}`, this.guys);
  }

  setGuys(guys: Guy[]): void {
    this.guys = [...guys];
  }

  addGuy(guy: Guy): void {
    this.guys = [...this.guys, guy];
  }

  editGuy(guy: Guy, id: number) {
    this.guys[id] = {...guy};
    this.guysChanged.next();
  }

  deleteGuy(index: number) {
    this.guys.splice(index, 1);
    this.guysChanged.next();
  }

  getGuys(): Guy[] {
    return this.guys.slice();
  }

  getGuy(id: number): Guy {
    return this.guys.slice()[id];
  }
}
