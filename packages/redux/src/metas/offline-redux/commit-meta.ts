
export class CommitMeta<TValue>  {
    constructor(
        public stateKey: string,
        public value: TValue
    ) { }
}
