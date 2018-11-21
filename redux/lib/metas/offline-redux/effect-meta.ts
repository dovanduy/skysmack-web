import { EffectRequest } from './../../models/effect-request';

export class EffectMeta<TBody> {
    constructor(
        public request: EffectRequest<TBody>
    ) { }
}
