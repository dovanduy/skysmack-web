import { Injectable } from '@angular/core';
import { Notifications } from '@skysmack/ng-framework';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgNotifications implements Notifications {

    constructor(
        public snackBar: MatSnackBar,
    ) { }

    public showSnackbarMessage(message: string, action: string = null, duration: number = 1000) {
        const snackBarRef = this.snackBar.open(message, action, { duration } as MatSnackBarConfig);

        if (action) {
            snackBarRef.onAction().pipe(take(1)).subscribe(() => {
                console.log('Action clicked.');
            });
        }
    }

    public showTranslatedSnackbarMessage(translationString: string, translationParams: NumIndex<string> = {}, action: string = null, duration: number = 1000) {
        const snackBarRef = this.snackBar.open(translationString, action, { duration } as MatSnackBarConfig);
        if (action) {
            snackBarRef.onAction().pipe(take(1)).subscribe(() => {
                console.log('Action clicked.');
            });
        }
    }
}