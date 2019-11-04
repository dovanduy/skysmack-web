import { BehaviorSubject } from 'rxjs';
import { Epic, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';
import { ReducerRegistry } from '@skysmack/redux';

const epicRegister = {};
export const epic$: BehaviorSubject<Epic<AnyAction>> = new BehaviorSubject(combineEpics());

export const registerRedux = (name: string, reducer: Function, epics: { epics: Epic[], [key: string]: any }): void => {
    ReducerRegistry.Instance.register(name, reducer);
    registerEpics(epics, name);
};

export const registerEpics = (epicsClass: { epics: Epic[], [key: string]: any }, epicsName?: string): void => {
    const registered = epicRegister[epicsName];
    if (!registered && epicsClass.epics.length > 0) {
        epicsClass.epics.forEach(epic => epic$.next(epic));
        epicRegister[epicsName] = epicsName;
    }
};
