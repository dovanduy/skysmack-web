import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NumIndex } from '@skysmack/framework';
import { Injectable } from '@angular/core';
import { Notifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgNotifications implements Notifications {

    constructor(
        public snackBar: MatSnackBar,
        public translateService: TranslateService
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
        this.translateService.get(translationString, translationParams).pipe(take(1)).subscribe((translatedMessage: string) => {
            const snackBarRef = this.snackBar.open(translatedMessage, action, { duration } as MatSnackBarConfig);
            if (action) {
                snackBarRef.onAction().pipe(take(1)).subscribe(() => {
                    console.log('Action clicked.');
                });
            }
        });
    }
}
