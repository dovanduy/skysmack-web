export class CurrentUser {
    public resource: string;
    public token_type: string;
    public access_token: string;
    public refresh_token: string;
    public expires_in: number;
    public loginTime: number;
    public email: string;
    public authPath: string;

    constructor(init?: Partial<CurrentUser>) {
        Object.assign(this, init);
    }
}

export function IsAuthenticated(currentUser: CurrentUser): boolean {
    let tokenExpired = true;
    
    if (currentUser && currentUser.access_token && currentUser.loginTime) {
        tokenExpired = Date.now() < (new Date(currentUser.loginTime).getTime() + currentUser.expires_in * 1000);
    }

    return tokenExpired;
}

export function TokenExpiresSoon(currentUser: CurrentUser): boolean {
    let tokenExpiresSoon = true;
    
    if (currentUser && currentUser.access_token && currentUser.loginTime) {
        // 20% before expire
        tokenExpiresSoon = Date.now() > (new Date(currentUser.loginTime).getTime() + currentUser.expires_in * 800);
    }

    return tokenExpiresSoon;
}