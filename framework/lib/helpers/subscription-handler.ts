import { SubscriptionLike } from 'rxjs';

export class SubscriptionHandler {
    public subscriptions: SubscriptionLike[] = [];

    public subscribe(subscription: SubscriptionLike): SubscriptionLike {
        this.subscriptions.push(subscription);
        return subscription;
    }

    public unsubscribe() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
