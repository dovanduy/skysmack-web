import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { take } from 'rxjs/operators';

export abstract class NotificationsBase {

    constructor(
        public snackBar: MatSnackBar
    ) { }

    protected showSnackbarMessage(message: string, action: string = null, duration: number = 1000) {
        const snackBarRef = this.snackBar.open(message, action, { duration } as MatSnackBarConfig);

        if (action) {
            snackBarRef.onAction().pipe(take(1)).subscribe(() => {
                console.log('Action clicked.');
            });
        }
    }
}
