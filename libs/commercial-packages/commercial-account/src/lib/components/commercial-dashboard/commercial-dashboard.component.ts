import { Component, OnInit } from '@angular/core';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
import { Observable } from 'rxjs';
import { CurrentUser } from '@skysmack/framework';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-dashboard',
  templateUrl: './commercial-dashboard.component.html',
  styleUrls: ['./commercial-dashboard.component.scss']
})
export class CommercialDashboardComponent implements OnInit {

  public currentUser$: Observable<CurrentUser>;

  constructor(
    public store: NgAuthenticationStore
  ) { }

  ngOnInit() {
    this.currentUser$ = this.store.getCurrentUser();
    this.currentUser$.pipe(tap(x => console.log(x))).subscribe();
  }

}
