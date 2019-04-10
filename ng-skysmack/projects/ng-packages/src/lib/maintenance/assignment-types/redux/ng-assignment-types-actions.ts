import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AssignmentTypesAppState, AssignmentType, ASSIGNMENT_TYPES_ADDITIONAL_PATHS, ASSIGNMENT_TYPES_REDUX_KEY } from '@skysmack/packages-maintenance';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesActions extends RecordActionsBase<AssignmentTypesAppState, NgRedux<AssignmentTypesAppState>> {
    constructor(protected store: NgRedux<AssignmentTypesAppState>) { super(store, ASSIGNMENT_TYPES_REDUX_KEY, ASSIGNMENT_TYPES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<AssignmentType, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
