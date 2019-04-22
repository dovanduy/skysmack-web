import { HttpMethod } from '@skysmack/framework';

export class EffectRequest<TBody> {
    constructor(
        public path: string,
        public method: HttpMethod,
        public body?: TBody,
        public params?: string | { [name: string]: string | string[]; },
        public headers?: { [header: string]: string | string[]; }
    ) { }
}

