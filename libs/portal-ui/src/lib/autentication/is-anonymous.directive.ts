import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { NgAuthenticationStore } from '@skysmack/ng-redux';
import { map } from 'rxjs/operators';


// tslint:disable-next-line:directive-selector
@Directive({ selector: '[isAnonymous]' })
export class IsAnonymousDirective implements OnInit, OnDestroy {

    public subscription: SubscriptionLike;

    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainer: ViewContainerRef,
        public store: NgAuthenticationStore
    ) { }

    ngOnInit() {
        this.subscription = this.store.isCurrentUserAuthenticated().pipe(
            map(authenticated => {
                if (authenticated) {
                    this.viewContainer.clear();
                } else {
                    this.viewContainer.clear();
                    this.viewContainer.createEmbeddedView(this.templateRef);
                }
            })
        ).subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
