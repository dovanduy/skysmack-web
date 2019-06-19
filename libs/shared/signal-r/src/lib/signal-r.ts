import { HubConnection } from '@aspnet/signalr';
import { ApiDomain } from '@skysmack/framework';
import * as signalR from "@aspnet/signalr";
import { from, interval, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

class SignalRProvider {
    public logic(message: any) { }
}

export class SignalR {
    private hubConnection: HubConnection;

    // Todo: How do we get this???
    public apiDomain: ApiDomain;
    public static API_DOMAIN: ApiDomain;

    public connected = new BehaviorSubject(false);

    // Singleton pattern
    private static _instance: SignalR;
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
    private constructor() {
        // this.init();
        this.init();
    }

    private init() {
        this.apiDomain = SignalR.API_DOMAIN;

        //this lines up with the hub mapped in the startup
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.apiDomain.domain}/skysmack/signalr`)
            .build();

        //this lines up with the method called by `SendAsync`
        this.hubConnection.on("Message", (packagePath: string, message: any) => {
            console.log("New SignalR message", packagePath, message);
        });

        this.hubConnection.onclose(() => {
            this.connected.next(false);
            this.startHubConnection()
        });

        this.startHubConnection();
    }

    private startHubConnection() {
        let successfullyStarted = false;
        do {
            //this will start the long polling connection
            this.hubConnection.start()
                .then(() => { console.log("Connection started");
                this.connected.next(true);
                successfullyStarted = true;
            })
            .catch(err => { console.error("Connection not started", err); });

        } while (!successfullyStarted)
    }

    public action(packagePath: string, data: any) {
        this.hubConnection.invoke('action', packagePath, data);
    }

    public join(packagePath: string) {
        console.log(packagePath);
        this.hubConnection.invoke('Join', packagePath);
    }

    public leave(packagePath: string) {
        this.hubConnection.invoke('Leave', packagePath);
    }
}
