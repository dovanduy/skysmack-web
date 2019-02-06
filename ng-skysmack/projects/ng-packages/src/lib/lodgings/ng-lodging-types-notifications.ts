import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { LodgingType } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesNotifications extends DocumentRecordNotifications<LodgingType, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
