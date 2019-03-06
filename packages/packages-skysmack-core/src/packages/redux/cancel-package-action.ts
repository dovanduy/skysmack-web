import { LocalObjectStatus, Package, LocalObject } from '@skysmack/framework';
import { PackagesState } from './packages-reducer';
import { ReduxAction, CancelActionMeta, ReduxOfflineMeta } from '@skysmack/redux';

export const cancelPackageActionOutboxFilter = (outbox, action: ReduxAction<{ _package: LocalObject<Package, string> }, CancelActionMeta>) => {
    return outbox
        .filter((item: ReduxAction<any, ReduxOfflineMeta<any[], any, any>>) => (item && item.meta && item.meta.offline && item.meta.offline.commit && item.meta.offline.commit.meta) ? true : false)
        .filter((item: ReduxAction<any, ReduxOfflineMeta<any[], any, any>>) => item.meta.offline.commit.meta.value.find(_package => _package.localId === action.payload._package.localId ? false : true));
};

export const cancelPackageAction = (state: PackagesState, action: ReduxAction<{ _package: LocalObject<Package, string> }, CancelActionMeta>): PackagesState => {
    const newState = Object.assign({}, state);

    switch (action.payload._package.status) {
        case LocalObjectStatus.CREATING:
            return cancelCreateAction(newState, action);
        case LocalObjectStatus.MODIFYING:
            return cancelEditAction(newState, action);
        case LocalObjectStatus.DELETING:
            return cancelDeleteAction(newState, action);
        default:
            return newState;
    }
};

const cancelCreateAction = (newState: PackagesState, action: ReduxAction<{ _package: LocalObject<Package, string> }, CancelActionMeta>): PackagesState => {
    const _package = action.payload._package;
    delete newState.packages[_package.localId];
    return newState;
};

const cancelEditAction = (newState: PackagesState, action: ReduxAction<{ _package: LocalObject<Package, string> }, CancelActionMeta>): PackagesState => {
    const _package = action.payload._package;
    newState.packages[_package.localId].object = action.payload._package.oldObject;
    newState.packages[_package.localId].status = LocalObjectStatus.OK;
    newState.packages[_package.localId].error = false;
    return newState;
};

const cancelDeleteAction = (newState: PackagesState, action: ReduxAction<{ _package: LocalObject<Package, string> }, CancelActionMeta>): PackagesState => {
    const _package = action.payload._package;
    newState.packages[_package.localId].status = LocalObjectStatus.OK;
    newState.packages[_package.localId].error = false;
    return newState;
};
