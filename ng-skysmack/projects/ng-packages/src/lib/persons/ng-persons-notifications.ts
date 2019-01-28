import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LocalObject } from '@skysmack/framework';
import { Person } from '@skysmack/packages-persons';
import { DocumentRecordNotifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgPersonsNotifications extends DocumentRecordNotifications<Person, number> {
    constructor(
        public snackBar: MatSnackBar
    ) {
        super(snackBar);
    }

    protected toStringAddSuccess(value: LocalObject<Person, number>[]): string {
        return `${value.map(person => person.object.displayName).join(', ')} was created successfully`;
    }
    protected toStringAddError(value: LocalObject<Person, number>[]): string {
        return `${value.map(person => person.object.displayName).join(', ')} was created successfully`;
    }

    protected toStringUpdateSuccess(value: LocalObject<Person, number>[]): string {
        return `${value.map(person => person.object.displayName).join(', ')} was updated successfully`;
    }
    protected toStringUpdateError(value: LocalObject<Person, number>[]): string {
        return `${value.map(person => person.object.displayName).join(', ')} was updated successfully`;
    }

    protected toStringRemoveSuccess(value: LocalObject<Person, number>[]): string {
        return `${value.map(person => person.object.displayName).join(', ')} was removed successfully`;
    }
    protected toStringRemoveError(value: LocalObject<Person, number>[]): string {
        return `${value.map(person => person.object.displayName).join(', ')} was removed successfully`;
    }
}
