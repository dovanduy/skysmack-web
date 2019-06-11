import { Field } from './field';

export class ResultField extends Field {
    public resultLogic: Function;
    constructor(values: Partial<ResultField>) { super(values); }
}
