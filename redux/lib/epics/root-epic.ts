import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Epic, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';

// An epic is a function which takes a stream of actions and returns a stream of actions. Actions in, actions out.

export let eagerEpics: Epic;
export const epic$: BehaviorSubject<Epic<AnyAction>> = new BehaviorSubject<Epic<AnyAction>>((x) => x);

export const registerLazyEpics = (epics: Epic[], from: string = '') => epics.forEach(epic => {
    epic$.next(epic)
});

export const registerEagerEpics = (epics: Epic[]) => {
    eagerEpics ? eagerEpics = combineEpics(...epics, eagerEpics) : eagerEpics = combineEpics(...epics);
    registerLazyEpics([eagerEpics])
}

export const rootEpic = (action$, state$) => epic$.pipe(
    mergeMap<Epic<AnyAction>, AnyAction>(epic => epic(action$, state$, undefined))
)
