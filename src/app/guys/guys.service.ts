import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Guy} from './guy.model';

@Injectable({
  providedIn: 'root'
})
export class GuysService {
  guys: Guy[];
  guysChanged = new Subject();

  constructor(private httpClient: HttpClient) {
  }

  loadGuys(): Observable<Guy[]> {
    return this.httpClient.get<Guy[]>('https://car-diary-bb6a2.firebaseio.com/guys.json');
  }

  saveGuys(): Observable<Guy[]> {
    return this.httpClient.put<Guy[]>('https://car-diary-bb6a2.firebaseio.com/guys.json', this.guys);
  }

  setGuys(guys: Guy[]): void {
    this.guys = [...guys];
  }

  addGuy(guy: Guy): void {
    this.guys = [...this.guys, guy];
  }

  deleteGuy(index: number) {
    this.guys.splice(index, 1);
    this.guysChanged.next();
  }

  getGuys(): Guy[] {
    return this.guys.slice();
  }
}
