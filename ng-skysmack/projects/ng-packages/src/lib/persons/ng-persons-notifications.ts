import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Person } from '@skysmack/packages-persons';
import { DocumentRecordNotifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgPersonsNotifications extends DocumentRecordNotifications<Person, number> {
    constructor(
        public snackBar: MatSnackBar
    ) {
        super(snackBar);
    }
}
