import { LocalObjectStatus } from './local-object-status';
import { Guid } from 'guid-typescript';
import { Identifiable } from './identifiable';

export class LocalObject<TObject extends Identifiable<TKey>, TKey> {
    public localId: string = Guid.create().toString();
    public status: LocalObjectStatus = LocalObjectStatus.OK;
    public modifyType: string;
    public isNew: boolean = false;
    public foreignKey: string;
    public object: TObject;
    public oldObject: TObject;

    public error: any;

    public constructor(init?: Partial<LocalObject<TObject, TKey>>) {
        Object.assign(this, init);
    }


}