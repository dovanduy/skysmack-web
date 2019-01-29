import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NumIndex } from '@skysmack/framework';

export abstract class NotificationsBase {

    constructor(
        public snackBar: MatSnackBar,
        public translateService: TranslateService,
        public translationPrefix: string
    ) { }

    protected showSnackbarMessage(message: string, action: string = null, duration: number = 1000) {
        const snackBarRef = this.snackBar.open(message, action, { duration } as MatSnackBarConfig);

        if (action) {
            snackBarRef.onAction().pipe(take(1)).subscribe(() => {
                console.log('Action clicked.');
            });
        }
    }

    protected showTranslatedSnackbarMessage(translationString: string, translationParams: NumIndex<string> = {}, action: string = null, duration: number = 1000) {
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
