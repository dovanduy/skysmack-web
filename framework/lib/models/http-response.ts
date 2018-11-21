/**
 * Inspiration taken from the @angular/common/http/response.d.ts
 */
export class HttpResponse {
    /**
    * All response headers.
    */
    readonly headers: string | { [name: string]: string | string[] };

    /**
     * Response status code.
     */
    readonly status: number;

    /**
     * Textual description of response status code.
     *
     * Do not depend on this.
     */
    readonly statusText: string;

    /**
     * URL of the resource retrieved, or null if not available.
     */

    readonly url: string | null;

    /**
     * Whether the status code falls in the 2xx range.
     */
    readonly ok: boolean;

    constructor(init: Partial<HttpResponse>) { Object.assign(this, init) };
}