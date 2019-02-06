import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Product } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductsNotifications extends DocumentRecordNotifications<Product, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
