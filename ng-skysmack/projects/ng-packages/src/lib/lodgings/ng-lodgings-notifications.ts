import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Lodging } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingsNotifications extends RecordNotifications<Lodging, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
