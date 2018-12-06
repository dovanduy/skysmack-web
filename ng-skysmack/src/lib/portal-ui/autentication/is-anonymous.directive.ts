import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { DefaultAuthenticationStore } from './default-authentication-store';


// tslint:disable-next-line:directive-selector
@Directive({ selector: '[isAnonymous]' })
export class IsAnonymousDirective implements OnInit, OnDestroy {

    public subscription: SubscriptionLike;

    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainer: ViewContainerRef,
        public store: DefaultAuthenticationStore
    ) { }

    ngOnInit() {
        this.subscription = this.store.isCurrentUserAuthenticated().subscribe(authenticated => {
            this.showIfAnonymous(authenticated);
        });
    }

    public showIfAnonymous(loggedIn: boolean) {
        if (loggedIn) {
            this.viewContainer.clear();
        } else {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
