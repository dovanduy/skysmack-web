import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { ProductType } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductTypesNotifications extends RecordNotifications<ProductType, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
