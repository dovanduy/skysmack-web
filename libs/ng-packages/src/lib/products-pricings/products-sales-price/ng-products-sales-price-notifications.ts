import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';
import { ProductsSalesPrice } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceNotifications extends RecordNotifications<ProductsSalesPrice, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
