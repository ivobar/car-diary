import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GuysService} from '../guys.service';
import {Guy} from '../guy.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guy-list',
  templateUrl: './guy-list.component.html',
  styleUrls: ['./guy-list.component.scss']
})
export class GuyListComponent implements OnInit, OnDestroy {
  guySub: Subscription;
  guysChangesSub: Subscription;
  guys: Guy[];

  constructor(private guysService: GuysService,
              private router: Router) {
  }

  ngOnInit() {
    this.guySub = this.guysService.loadGuys().subscribe(
      (guys: Guy[]) => {
        this.guys = guys || [];
        this.guysService.setGuys(guys || []);
        this.guysChangesSub = this.guysService.guysChanged.subscribe(
          () => {
            this.guys = this.guysService.getGuys();
          }
        );
      }
    );
  }

  onDeleteGuy(index: number) {
    this.guysService.deleteGuy(index);
    this.guysService.saveGuys().subscribe(
      () => {
        this.router.navigate(['/guys/list']);
      }
    );
  }

  ngOnDestroy() {
    this.guySub.unsubscribe();
    this.guysChangesSub.unsubscribe();
  }

}
