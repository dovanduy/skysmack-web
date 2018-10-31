import { LocalObjectStatus } from './local-object-status';
import { Guid } from 'guid-typescript';

export class LocalObject<TObject> {
    public localId: string = Guid.create().toString();
    public status: LocalObjectStatus = LocalObjectStatus.OK;
    public modifyType: string;
    public isNew: boolean = false;

    public object: TObject;    
    public oldObject: TObject;

    public error: any;

    public constructor(init?: Partial<LocalObject<TObject>>) {
        Object.assign(this, init);
    }
}