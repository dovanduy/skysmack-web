import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, LocalObject } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { Connection, ConnectionKey, CONNECTIONS_REDUX_KEY, CONNECTIONS_ADDITIONAL_PATHS, ConnectionRequest, TerminalAction } from '@skysmack/packages-terminal-payments';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgConnectionsRequests extends NgRecordRequests<Connection, ConnectionKey> {
    constructor(
        protected httpClient: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(httpClient, apiDomain, CONNECTIONS_REDUX_KEY, CONNECTIONS_ADDITIONAL_PATHS);
    }

    public connect(packagePath: string, value: LocalObject<Connection, ConnectionKey>): Observable<HttpResponse<any>> {
        const url = `${this.apiDomain.domain}/${packagePath}`;
        const connection = new ConnectionRequest({
            clientId: value.object.id.clientId,
            terminalId: value.object.id.terminalId,
            terminalAction: TerminalAction.Connect
        });

        return this.httpClient.post(`${url}/actions/change-connection`, connection, { observe: 'response' });
    }

    public open(packagePath: string, value: LocalObject<Connection, ConnectionKey>): Observable<HttpResponse<any>> {
        const url = `${this.apiDomain.domain}/${packagePath}`;
        const connection = new ConnectionRequest({
            clientId: value.object.id.clientId,
            terminalId: value.object.id.terminalId,
            terminalAction: TerminalAction.Open
        });

        return this.httpClient.post(`${url}/actions/change-connection`, connection, { observe: 'response' });
    }

    public close(packagePath: string, value: LocalObject<Connection, ConnectionKey>): Observable<HttpResponse<any>> {
        const url = `${this.apiDomain.domain}/${packagePath}`;
        const connection = new ConnectionRequest({
            clientId: value.object.id.clientId,
            terminalId: value.object.id.terminalId,
            terminalAction: TerminalAction.Close
        });

        return this.httpClient.post(`${url}/actions/change-connection`, connection, { observe: 'response' });
    }

    public disconnect(packagePath: string, value: LocalObject<Connection, ConnectionKey>): Observable<HttpResponse<any>> {
        const url = `${this.apiDomain.domain}/${packagePath}`;
        const connection = new ConnectionRequest({
            clientId: value.object.id.clientId,
            terminalId: value.object.id.terminalId,
            terminalAction: TerminalAction.Disconnect
        });

        return this.httpClient.post(`${url}/actions/change-connection`, connection, { observe: 'response' });
    }
}
