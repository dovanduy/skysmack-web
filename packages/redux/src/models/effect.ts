import { EffectRequest } from './effect-request';

export class Effect<TBody> {
    constructor(
        public request: EffectRequest<TBody>
    ) { }
}
