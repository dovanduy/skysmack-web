import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { Workflow } from '../../models/workflow';
import { sharedReducer } from '@skysmack/redux';
import { WORKFLOWS_REDUX_KEY, WORKFLOWS_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access workflows via the GLOBAL state. E.g. state.workflows (where workflows is the reducer name.)
 */
export class WorkflowsAppState extends AppState {
    public workflows: WorkflowsState;
}

export class WorkflowsState implements RecordState<Workflow, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Workflow, number>>> = {};
}

export function workflowsReducer(state = new WorkflowsState(), action: ReduxAction, prefix: string = WORKFLOWS_REDUX_KEY): WorkflowsState {
    state = sharedReducer(state, action, new WorkflowsState(), WORKFLOWS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<WorkflowsState, Workflow, number>(state, action, prefix)
            };
    }
}
