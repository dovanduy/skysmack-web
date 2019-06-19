import { HubConnection } from '@aspnet/signalr';
import { ApiDomain } from '@skysmack/framework';
import * as signalR from "@aspnet/signalr";
import { BehaviorSubject } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { SignalRProvider } from './models/signal-r-provider';


export class SignalR {
    public static API_DOMAIN: ApiDomain;
    public apiDomain: ApiDomain;

    private hubConnection: HubConnection;
    private providerRegister = {};
    private providers = [];
    private joinedPackages = {};

    public connected = new BehaviorSubject(false);

    // Singleton pattern
    private static _instance: SignalR;
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
    private constructor() {
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
            console.log(packagePath, message);
            this.providers.forEach(provider => provider.messageProvided(message))
        });

        this.hubConnection.onclose(() => {
            this.connected.next(false);
            this.startHubConnection()
        });

        this.startHubConnection();
    }

    private startHubConnection() {
        let successfullyStarted = false;
        //this will start the long polling connection
        this.hubConnection.start()
            .then(() => {
                console.log("Connection started");
                this.connected.next(true);
                successfullyStarted = true;
                Object.keys(this.joinedPackages).forEach(key => this.join(this.joinedPackages[key]));
            })
            .catch(err => { console.error("Connection not started", err); });
    }

    public registerProvider(provider: SignalRProvider) {
        if (!this.providerRegister[provider.name]) {
            this.providerRegister[provider.name] = provider;
            this.providers.push(provider);
        }
    }

    public action(packagePath: string, data: any) {
        this.connected.pipe(
            filter(x => x),
            map(() => this.hubConnection.invoke('action', packagePath, data)),
            take(1)
        ).subscribe();
    }

    public join(packagePath: string) {
        this.connected.pipe(
            filter(x => x),
            map(() => {
                this.joinedPackages[packagePath] = packagePath;
                this.hubConnection.invoke('Join', packagePath);
            }),
            take(1)
        ).subscribe();
    }

    public leave(packagePath: string) {
        this.connected.pipe(
            filter(x => x),
            map(() => {
                delete this.joinedPackages[packagePath];
                this.hubConnection.invoke('Leave', packagePath);
            }),
            take(1)
        ).subscribe();
    }
}
