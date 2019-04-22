import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';
import { ProductPriceChange } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesNotifications extends RecordNotifications<ProductPriceChange, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
