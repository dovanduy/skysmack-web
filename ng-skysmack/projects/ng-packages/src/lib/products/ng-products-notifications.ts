import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Product } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductsNotifications extends RecordNotifications<Product, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
