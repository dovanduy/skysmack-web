import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SkysmackRequests, CurrentTenantViewModel } from '@skysmack/packages-skysmack';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NgSkysmackRequests implements SkysmackRequests {
    protected prefix: 'skysmack';
    constructor(protected http: HttpClient) { }

    public get(): Observable<HttpResponse<CurrentTenantViewModel>> {
        return this.http.get<CurrentTenantViewModel>('http://client1.skysmack-io.test:2000/tenant', { observe: 'response' });
    }
}
