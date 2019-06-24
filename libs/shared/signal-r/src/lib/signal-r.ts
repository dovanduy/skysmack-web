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
            // console.log(packagePath, message);
            this.providers.forEach(provider => provider.messageProvided(packagePath, message))
        });

        this.hubConnection.onclose(() => {
            this.connected.next(false);
            setTimeout(() => this.startHubConnection(), 1000);
        });

        this.startHubConnection();
    }

    private startHubConnection() {
        // this will start the long polling connection
        this.hubConnection.start()
            .then(() => {
                this.connected.next(true);
                Object.keys(this.joinedPackages).forEach(key => this.join(this.joinedPackages[key], true));
            })
            .catch(err => {
                setTimeout(() => this.startHubConnection(), 1000);
            });
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

    public join(packagePath: string, force = false) {
        this.connected.pipe(
            filter(x => x),
            map(() => {
                if (!this.joinedPackages[packagePath]) {
                    this.joinedPackages[packagePath] = packagePath;
                    this.hubConnection.invoke('Join', packagePath);
                } else if (force) {
                    if (!this.joinedPackages[packagePath]) {
                        this.joinedPackages[packagePath] = packagePath;
                    }
                    this.hubConnection.invoke('Join', packagePath);
                }
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
