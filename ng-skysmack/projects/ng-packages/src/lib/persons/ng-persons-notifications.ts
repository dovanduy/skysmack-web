import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Person } from '@skysmack/packages-persons';
import { DocumentRecordNotifications } from '@skysmack/ng-redux';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class NgPersonsNotifications extends DocumentRecordNotifications<Person, number> {
    constructor(
        public snackBar: MatSnackBar,
        public translateService: TranslateService
    ) {
        super(snackBar, translateService, 'PERSONS');
    }

    // Custom notification example.
    // public addSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>) {
    //     const translationString = this.translationPrefix + '.NOTIFICATIONS.ADD.SUCCESS';
    //     const translationParams = { 0: action.meta.value[0].object.displayName };
    //     this.showTranslatedSnackbarMessage(translationString, translationParams, undefined, 2000);
    // }
}
