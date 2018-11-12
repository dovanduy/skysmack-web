import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalObject } from 'framework/models';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Package } from 'framework/packages/package';
import { SubscriptionHandler } from 'framework/helpers';
import { BaseRedux } from 'framework/redux';

export class EntityBase implements OnDestroy, OnInit {
  public subscriptionHandler = new SubscriptionHandler();

  public entityId: any;
  public path: string;
  public package$: Observable<Package>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public redux: BaseRedux
  ) { }

  ngOnInit() {
    // Used together with dynamic routing in fallback component.
    this.router.onSameUrlNavigation = 'ignore';
    this.getParams();
    this.getCurrentPackage();
    this.subscriptionHandler.unsubscribe();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public getParams() {
    this.path = this.router.url.split('/')[1];
    if (this.entityId === undefined) {
      if (this.activatedRoute) {
        this.subscriptionHandler.subscribe(this.activatedRoute.params
          .pipe(take(1))
          .subscribe(params => {
            if (params['id']) {
              this.entityId = params['id'];
              // Fields have a "key" as id. Set to id if present.
            } else if (params['key']) {
              this.entityId = params['key'];
            }
          }));
      }
    }
  }

  public getCurrentPackage() {
    this.package$ = this.redux.getCurrentPackage(this.path);
  }

  public redirect(path: string) {
    this.router.navigate([path]);
  }
}

