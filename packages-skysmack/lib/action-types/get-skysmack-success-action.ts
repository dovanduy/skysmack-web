import { AnyAction } from 'redux';
import { Skysmack } from './../models/skysmack';

export class GetSkysmackSuccessAction implements AnyAction {
    public type: any;
    public payload: Skysmack;

    public constructor(init?: Partial<GetSkysmackSuccessAction>) {
        Object.assign(this, init);
    }
}
