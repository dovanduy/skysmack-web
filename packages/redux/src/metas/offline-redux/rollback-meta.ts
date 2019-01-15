export class RollbackMeta<TValue = any> {
    constructor(
        public stateKey: string,
        public value: TValue
    ) { }
}
