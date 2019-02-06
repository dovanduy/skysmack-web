import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Lodging } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingsNotifications extends DocumentRecordNotifications<Lodging, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
