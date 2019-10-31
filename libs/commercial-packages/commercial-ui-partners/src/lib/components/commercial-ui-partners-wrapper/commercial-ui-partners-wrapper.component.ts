import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgAuthenticationStore, NgAuthenticationActions } from '@skysmack/ng-framework';
import { SubscriptionHandler, MenuAreaItems } from '@skysmack/framework';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { NgMenuProviders } from '../../navigation/ng-menu-providers';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-commercial-ui-partners-wrapper',
  templateUrl: './commercial-ui-partners-wrapper.component.html',
  styleUrls: ['./commercial-ui-partners-wrapper.component.scss']
})
export class CommercialUiPartnersWrapperComponent implements OnInit, OnDestroy {

  public static COMPONENT_KEY = 'CommercialUiPartnersWrapper';
  public componentKey = CommercialUiPartnersWrapperComponent.COMPONENT_KEY

  private subscriptionHandler = new SubscriptionHandler();
  public menuAreaItems$: Observable<MenuAreaItems[]>;

  constructor(
    public store: NgAuthenticationStore,
    public actions: NgAuthenticationActions,
    public router: Router,
    public ngMenuProviders: NgMenuProviders
  ) { }

  ngOnInit() {
    this.redirectUnauthenticated();
    this.menuAreaItems$ = this.ngMenuProviders.getMenuAreaItems(null, this.componentKey).pipe(
      map(menuAreaItems => {
        return menuAreaItems.filter(menuAreaItem => menuAreaItem && menuAreaItem.providedIn && menuAreaItem.providedIn.includes('top'));
      })
    );
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public actionEvent(event: { action: Function, _this: any }) {
    event.action(event._this);
  }

  private redirectUnauthenticated() {
    this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated().pipe(tap(authenticated => {
      if (!authenticated) {
        this.router.navigate(['/', 'account', 'login']);
      }
    })).subscribe());
  }
}
