import { HttpResponse } from './http-response';

/**
 * Inspiration taken from the @angular/common/http/response.d.ts
 */
export class HttpErrorResponse extends HttpResponse {
    readonly message: string;
    readonly error: any | null;

    constructor(init: Partial<HttpErrorResponse>) {
        super(init);
    };
}
