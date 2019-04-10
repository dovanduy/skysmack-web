import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';
import { ProductType } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductTypesNotifications extends RecordNotifications<ProductType, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
