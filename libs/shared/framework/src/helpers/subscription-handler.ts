import { SubscriptionLike } from 'rxjs';

export class SubscriptionHandler {
    public subscriptions: SubscriptionLike[] = [];

    public register(subscription: SubscriptionLike): SubscriptionLike {
        this.subscriptions.push(subscription);
        return subscription;
    }

    public unsubscribe() {
        this.subscriptions.filter(sub => sub).forEach(subscription => subscription.unsubscribe());
    }
}
