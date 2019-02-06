import { Injectable, Inject } from '@angular/core';
import { Person } from '@skysmack/packages-persons';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { ReduxAction, CommitMeta } from '@skysmack/redux';
import { LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPersonsNotifications extends DocumentRecordNotifications<Person, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }

    public addSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.SUCCESS', { 0: action.meta.value[0].object.displayName }, undefined, 2000);
    }
}
