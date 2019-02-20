import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AssignmentTypesAppState, AssignmentType } from '@skysmack/packages-maintenance';
import { LocalObject, NumIndex, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesActions extends RecordActionsBase<AssignmentTypesAppState, NgRedux<AssignmentTypesAppState>> {
    constructor(protected store: NgRedux<AssignmentTypesAppState>) { super(store, 'ASSIGNMENT_TYPES_', ['assignments', 'types',]); }

    protected getMessageParams(record: LocalObject<AssignmentType, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
