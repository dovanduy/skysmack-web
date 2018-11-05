import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

const epic$ = new BehaviorSubject(combineEpics());
export const rootEpic = (action$, state$) => epic$.pipe(
    mergeMap(epic => epic(action$, state$, undefined))
);
