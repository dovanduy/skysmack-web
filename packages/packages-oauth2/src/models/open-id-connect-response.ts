export interface OpenIdConnectResponse {
    access_token?: string;
    code?: string;
    error?: string;
    error_description?: string;
    error_uri?: string;
    expires_in?: number;
    id_token?: string;
    refresh_token?: string;
    resource?: string;
    scope?: string;
    state?: string;
    token_type?: string;
}
