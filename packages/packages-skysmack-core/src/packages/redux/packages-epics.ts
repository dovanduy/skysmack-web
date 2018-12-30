import { PackagesRequests } from './packages-requests';
import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { ReduxAction, PackagePathPayload } from '@skysmack/redux';
import { PackagesActions } from './packages-actions';
import { switchMap } from 'rxjs/operators';

export class PackagesEpics {
    public epics: Epic[];

    constructor(protected requests: PackagesRequests) {
        this.epics = [
            this.getEpic,
            this.getSingleEpic,
            this.getAvailablePackagesEpic
        ];
    }

    public getEpic = (action$: ActionsObservable<ReduxAction>) => action$.pipe(
        ofType(PackagesActions.GET_PACKAGES),
        switchMap(() => this.requests.get())
    )

    public getSingleEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>) => action$.pipe(
        ofType(PackagesActions.GET_SINGLE_PACKAGE),
        switchMap(action => this.requests.getSingle(action))
    )

    public getAvailablePackagesEpic = (action$: ActionsObservable<ReduxAction>) => action$.pipe(
        ofType(PackagesActions.GET_AVAILABLE_PACKAGES),
        switchMap(() => this.requests.getAvailablePackages())
    )
}