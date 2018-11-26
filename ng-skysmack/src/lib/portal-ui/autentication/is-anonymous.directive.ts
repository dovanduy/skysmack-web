import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';


// tslint:disable-next-line:directive-selector
@Directive({ selector: '[isAnonymous]' })
export class IsAnonymousDirective implements OnInit, OnDestroy {

    public subscription: SubscriptionLike;

    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainer: ViewContainerRef,
        // TODO: Get auth user store.
        // public redux: AuthUserRedux
    ) { }

    ngOnInit() {
        // this.subscription = this.redux.isCurrentUserAuthenticated().subscribe(authenticated => {
        //     this.showIfAnonymous(authenticated);
        // });
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
