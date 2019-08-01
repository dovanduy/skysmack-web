import { Component, OnInit } from '@angular/core';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
import { Observable } from 'rxjs';
import { CurrentUser } from '@skysmack/framework';

@Component({
  selector: 'ss-commercial-account-dashboard',
  templateUrl: './commercial-account-dashboard.component.html',
  styleUrls: ['./commercial-account-dashboard.component.scss']
})
export class CommercialAccountDashboardComponent implements OnInit {

  public currentUser$: Observable<CurrentUser>;

  constructor(
    public store: NgAuthenticationStore
  ) { }

  ngOnInit() {
    this.currentUser$ = this.store.getCurrentUser();
  }
}
