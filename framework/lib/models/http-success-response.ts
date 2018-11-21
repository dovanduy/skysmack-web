import { HttpResponse } from './http-response';

/**
 * Inspiration taken from the @angular/common/http/response.d.ts
 */
export class HttpSuccessResponse<T = unknown> extends HttpResponse {
    /**
     * The response body, or `null` if one was not returned.
     */
    readonly body: T | null;

    constructor(init: Partial<HttpSuccessResponse>) { super(init) };
}