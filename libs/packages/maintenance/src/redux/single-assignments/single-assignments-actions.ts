import { RecordActionsBase } from '@skysmack/redux';
import { Injectable } from '@angular/core';
import { SingleAssignmentsAppState } from './single-assignments-reducer';
import { Store } from 'redux';
import { SINGLE_ASSIGNMENTS_REDUX_KEY, SINGLE_ASSIGNMENTS_ADDITIONAL_PATHS } from '../../constants/constants';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { SingleAssignment } from '../../models/single-assignment';

export class SingleAssignmentsActions extends RecordActionsBase<SingleAssignmentsAppState, Store<SingleAssignmentsAppState>> {

    constructor(protected store: Store<SingleAssignmentsAppState>) { super(store, SINGLE_ASSIGNMENTS_REDUX_KEY, SINGLE_ASSIGNMENTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<SingleAssignment, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
