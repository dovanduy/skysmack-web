import { HubConnection } from '@aspnet/signalr';
import { ApiDomain } from '@skysmack/framework';
import * as signalR from "@aspnet/signalr";
import { interval } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { SignalRProvider } from './models/signal-r-provider';


export class SignalR {
    private hubConnection: HubConnection;
    private providerRegister = {};
    private providers = [];

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
        // Fake "message" from backend
        interval(1000).pipe(
            map(number => {
                if (number % 2) {
                    return { type: 'PersonsCreated', ids: [number + 1, number + 2, number + 3] };
                } else {
                    return { type: 'ProductsCreated', ids: [number + 1, number + 2, number + 3] };
                }
            }),
            tap(message => this.providers.forEach(provider => provider.messageProvided(message)))
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

    public registerProvider(provider: SignalRProvider) {
        if (!this.providerRegister[provider.name]) {
            this.providerRegister[provider.name] = provider;
            this.providers.push(provider);
        }
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
