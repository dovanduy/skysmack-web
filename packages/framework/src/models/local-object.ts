import { LocalObjectStatus } from './local-object-status';
import { Guid } from 'guid-typescript';

export class LocalObject<TObject, TKey> {
    public localId: string = Guid.create().toString();
    public identifier: string = 'id';
    public status: LocalObjectStatus = LocalObjectStatus.OK;
    public modifyType: string;
    public isNew: boolean = false;
    public foreignKey: string;
    public object: TObject;
    public oldObject: TObject;

    public error: any;

    public get objectIdentifier(): TKey {
        return this.object[this.identifier];
    }

    public constructor(init?: Partial<LocalObject<TObject, TKey>>) {
        Object.assign(this, init);
    }
}
