import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { LodgingType } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesNotifications extends RecordNotifications<LodgingType, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
