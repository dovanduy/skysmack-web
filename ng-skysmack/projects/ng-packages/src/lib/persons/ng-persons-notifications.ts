import { Injectable, Inject } from '@angular/core';
import { Person } from '@skysmack/packages-persons';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgPersonsNotifications extends DocumentRecordNotifications<Person, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
