import { Component, OnInit, Input } from '@angular/core';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { Package } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-lodging-reservations-dashboard',
  templateUrl: './lodging-reservations-dashboard.component.html',
  styleUrls: ['./lodging-reservations-dashboard.component.scss']
})
export class LodgingReservationsDashboardComponent implements OnInit {
  @Input() packagePath: string;
  public package$: Observable<Package>;

  constructor(
    public actions: NgLodgingReservationsActions,
    public store: NgLodgingReservationsStore,
    public skysmackStore: NgSkysmackStore
  ) { }

  ngOnInit() {
    this.package$ = this.skysmackStore.getCurrentPackage(this.packagePath).pipe(map(x => x._package));
  }

}
