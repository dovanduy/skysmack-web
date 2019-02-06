import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { ProductType } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductTypesNotifications extends DocumentRecordNotifications<ProductType, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
