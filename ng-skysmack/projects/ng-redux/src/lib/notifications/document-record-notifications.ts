import { MatSnackBar } from '@angular/material';
import { RecordNotifications } from './record-notifications';

export abstract class DocumentRecordNotifications<TRecord, TKey> extends RecordNotifications<TRecord, TKey> {
    constructor(
        public snackBar: MatSnackBar
    ) { super(snackBar); }
}
