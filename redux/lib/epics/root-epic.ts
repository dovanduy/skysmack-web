import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics, Epic } from 'redux-observable';

export const epic$ = new BehaviorSubject(combineEpics());

export function registerWithRootEpic(epics: Epic[]) {
    epics.forEach(epic => epic$.next(epic));
}

export const rootEpic = (action$, state$) => epic$.pipe(
    mergeMap(epic => epic(action$, state$, undefined))
);
