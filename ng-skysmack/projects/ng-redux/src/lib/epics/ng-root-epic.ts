import { BehaviorSubject } from 'rxjs';
import { Epic, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';

export const epic$: BehaviorSubject<Epic<AnyAction>> = new BehaviorSubject(combineEpics());
export const registerEpics = (epicsClass: { epics: Epic[], [key: string]: any }) => epicsClass.epics.forEach(epic => epic$.next(epic));
