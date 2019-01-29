import { Injectable, Inject } from '@angular/core';
import { Person } from '@skysmack/packages-persons';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { ReduxAction, CommitMeta } from '@skysmack/redux';
import { LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPersonsNotifications extends DocumentRecordNotifications<Person, number> {

    protected defaultTranslationString = 'PERSONS.NOTIFICATIONS.';

    constructor(
        @Inject('Notifications') public notifications: Notifications
    ) {
        super(notifications);
    }

    // // Custom notification example.
    // public addSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>) {
    //     const translationString = 'PERSONS.NOTIFICATIONS.ADD.SUCCESS';
    //     const translationParams = { 0: action.meta.value[0].object.displayName };
    //     this.notifications.showTranslatedSnackbarMessage(translationString, translationParams, undefined, 2000);
    // }
}
