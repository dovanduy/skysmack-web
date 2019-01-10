import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ReceiptsAppState, Receipt } from '@skysmack/packages-terminal-payments';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgReceiptsStore extends NgDocumentRecordReduxStore<ReceiptsAppState, Receipt, number> {
    constructor(protected ngRedux: NgRedux<ReceiptsAppState>) { super(ngRedux, 'receipts'); }
}
