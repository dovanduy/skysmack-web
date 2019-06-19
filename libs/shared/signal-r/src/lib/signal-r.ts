import { HubConnection } from '@aspnet/signalr';
import { ApiDomain } from '@skysmack/framework';
import * as signalR from "@aspnet/signalr";
import { from, interval } from 'rxjs';
import { tap, map } from 'rxjs/operators';

class SignalRProvider {
    public logic(message: any) { }
}

export class SignalR {
    private hubConnection: HubConnection;

    // Todo: How do we get this???
    public apiDomain: ApiDomain;
    public static API_DOMAIN: ApiDomain;

    // Singleton pattern
    private static _instance: SignalR;
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
    private constructor() {
        // this.init();
        this.fakeInit();
    }

    private fakeInit() {
        interval(1000).pipe(
            map(() => {
                return {
                    type: 'PersonsCreated',
                    ids: [1, 4, 5]
                };
            }),
            tap(x => console.log(x))
        ).subscribe();
    }

    private init() {
        this.apiDomain = SignalR.API_DOMAIN;

        //this lines up with the hub mapped in the startup
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.apiDomain.domain}/skysmack/signalr`)
            .build();

        //this will start the long polling connection
        this.hubConnection.start()
            .then(() => { console.log("Connection started"); })
            .catch(err => { console.error("Connection not started", err); });

        //this lines up with the method called by `SendAsync`
        this.hubConnection.on("Message", (packagePath: string, message: any) => {
            console.log("New SignalR message", packagePath, message);
        });
    }

    public action(packagePath: string, data: any) {
        this.hubConnection.invoke('action', packagePath, data);
    }

    public join(packagePath: string) {
        this.hubConnection.invoke('Join', packagePath);
    }

    public leave(packagePath: string) {
        this.hubConnection.invoke('Leave', packagePath);
    }
}
