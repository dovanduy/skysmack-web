import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { AnyAction } from 'redux';

// An epic is a function which takes a stream of actions and returns a stream of actions. Actions in, actions out.

export const epic$: BehaviorSubject<Epic<AnyAction>> = new BehaviorSubject<Epic<AnyAction>>((x) => x);

export const registerWithRootEpic = (epics: Epic[]) => epics.forEach(epic => {
    epic$.next(epic)
});

// export const registerWithRootEpic = (epics: Epic[]) => epic$.pipe(
//     map(currentEpic => epics.forEach(epic => epic$.next(combineEpics(epic, currentEpic))))
// );

export const rootEpic = (action$, state$) => epic$.pipe(
    mergeMap<Epic<AnyAction>, AnyAction>(epic => epic(action$, state$, undefined))
)
