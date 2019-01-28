import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LocalObject, HttpErrorResponse } from '@skysmack/framework';
import { Person } from '@skysmack/packages-persons';
import { DocumentRecordNotifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgPersonsNotifications extends DocumentRecordNotifications<Person, number> {
    constructor(
        public snackBar: MatSnackBar
    ) {
        super(snackBar);
    }
    protected toStringGetPagedError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }
    protected toStringGetSingleError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }

    protected toStringAddSuccess(value: LocalObject<Person, number>[]): string {
        return `${value.map(person => person.object.displayName).join(', ')} was created successfully`;
    }
    protected toStringAddError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }

    protected toStringUpdateSuccess(value: LocalObject<Person, number>[]): string {
        return `${value.map(person => person.object.displayName).join(', ')} was updated successfully`;
    }
    protected toStringUpdateError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }

    protected toStringRemoveSuccess(value: LocalObject<Person, number>[]): string {
        return `${value.map(person => person.object.displayName).join(', ')} was removed successfully`;
    }
    protected toStringRemoveError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }
}
