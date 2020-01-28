import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CloseWarningDialogComponent } from './close-warning-dialog.component';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CloseWarningService {

    public formChanged$ = new BehaviorSubject<boolean>(false);

    private _formChanged: boolean;
    public get formChanged(): boolean {
        return this._formChanged;
    }
    public set formChanged(v: boolean) {
        this.formChanged$.next(v)
        this._formChanged = v;
    }

    private askBeforeLeavingCallback = (e) => {
        const confirmationMessage = '\o/';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
    };

    constructor(
        private dialog: MatDialog
    ) { }

    public closeSidebar(): Observable<boolean> {
        return this.dialog.open(CloseWarningDialogComponent).afterClosed().pipe(
            map(close => {
                if (close) {
                    this.formChanged = false; // The user choose close and the form has been reset.
                    return close;
                }
                return close;
            })
        );
    }

    public startAskingBeforeClosing = () => {
        window.addEventListener('beforeunload', this.askBeforeLeavingCallback);
    }

    public stopAskingBeforeClosing = () => {
        window.removeEventListener('beforeunload', this.askBeforeLeavingCallback);
    }
}
