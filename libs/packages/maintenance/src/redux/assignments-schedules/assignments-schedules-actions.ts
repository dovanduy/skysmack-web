import { RecordActionsBase, ReduxAction, Effect, EffectRequest } from '@skysmack/redux';
import { AssignmentsSchedulesAppState } from './assignments-schedules-reducer';
import { Store } from 'redux';
import { ASSIGNMENTS_SCHEDULES_REDUX_KEY, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS } from '../../constants/constants';
import { LocalObject, StrIndex, HttpMethod } from '@skysmack/framework';
import { AssignmentsSchedule } from '../../models/assignments-schedule';
import { ScheduledAssignment, ScheduledAssignmentKey } from '../../models/scheduled-assignment';

export class AssignmentsSchedulesActions extends RecordActionsBase<AssignmentsSchedulesAppState, Store<AssignmentsSchedulesAppState>> {

    public static CHANGES_PUT = 'CHANGES_PUT';
    public static CHANGES_PUT_SUCCESS = 'CHANGES_PUT_SUCCESS';
    public static CHANGES_PUT_FAILURE = 'CHANGES_PUT_FAILURE';

    constructor(protected store: Store<AssignmentsSchedulesAppState>) { super(store, ASSIGNMENTS_SCHEDULES_REDUX_KEY, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS); }

    public changes(packagePath: string, records: LocalObject<ScheduledAssignment, ScheduledAssignmentKey>[]): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: ASSIGNMENTS_SCHEDULES_REDUX_KEY + AssignmentsSchedulesActions.CHANGES_PUT,
            meta: {
                offline: {
                    effect: new Effect<ScheduledAssignment[]>(new EffectRequest<ScheduledAssignment[]>(
                        `${packagePath}/assigments/schedules/changes`,
                        HttpMethod.PUT,
                        records.map(x => x.object)
                    )),
                    commit: new ReduxAction<any, { stateKey: string; value: LocalObject<ScheduledAssignment, ScheduledAssignmentKey>[] }>({
                        type: ASSIGNMENTS_SCHEDULES_REDUX_KEY + AssignmentsSchedulesActions.CHANGES_PUT_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: records
                        }
                    }),
                    rollback: new ReduxAction<any, { stateKey: string; value: LocalObject<ScheduledAssignment, ScheduledAssignmentKey>[] }>({
                        type: ASSIGNMENTS_SCHEDULES_REDUX_KEY + AssignmentsSchedulesActions.CHANGES_PUT_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: records,
                        }
                    })
                }
            }
        })));
    }

    public getMessageParams(record: LocalObject<AssignmentsSchedule, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
