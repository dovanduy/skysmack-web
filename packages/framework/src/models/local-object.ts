import { LocalObjectStatus } from './local-object-status';
import { Guid } from 'guid-typescript';

export class LocalObject<TObject, TKey> {
    public localId: string = Guid.create().toString();

    private _identifier: string;
    public get identifier(): string {
        if (!this._identifier) {
            return 'id'
        }
        return this._identifier;
    }
    public set identifier(v: string) {
        this._identifier = v;
        this.checkIdentifier();
    }

    public status: LocalObjectStatus = LocalObjectStatus.OK;
    public modifyType: string;
    public isNew: boolean = false;
    public foreignKey: string;
    public object: TObject;
    public oldObject: TObject;

    public error: any;

    public get objectIdentifier(): TKey {
        this.checkIdentifier();
        return this.object[this.identifier];
    }

    public constructor(init?: Partial<LocalObject<TObject, TKey>>) {
        Object.assign(this, init);
        this.checkIdentifier();
    }


    public checkIdentifier() {
        if (this.object[this.identifier] === undefined) {
            throw new Error(`You set '${this.identifier}' as the local object identifier, but there are no properties by that name. The object has the following properties: ${Object.keys(this.object).join(', ')}\n`);
        }
    }
}
