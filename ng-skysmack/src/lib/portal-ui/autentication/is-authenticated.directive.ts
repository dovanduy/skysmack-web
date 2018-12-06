import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { NgAuthenticationStore } from 'lib/ng-packages/authentication';


// tslint:disable-next-line:directive-selector
@Directive({ selector: '[isAuthenticated]' })
export class IsAuthenticatedDirective implements OnInit, OnDestroy {

    public subscription: SubscriptionLike;

    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainer: ViewContainerRef,
        public store: NgAuthenticationStore
    ) { }

    ngOnInit() {
        this.subscription = this.store.isCurrentUserAuthenticated().subscribe(authenticated => {
            this.showIfAuthenticated(authenticated);
        });
    }

    public showIfAuthenticated(loggedIn: boolean) {
        if (loggedIn) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
