import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';
import { ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceNotifications extends RecordNotifications<ProductTypeSalesPrice, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
