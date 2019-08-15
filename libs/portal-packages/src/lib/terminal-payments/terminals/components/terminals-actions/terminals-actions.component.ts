import { Component, OnInit } from '@angular/core';
import { NgTerminalsActions, NgTerminalsStore, NgTerminalsRequests, NgConnectionsStore, NgConnectionsActions, NgConnectionsRequests } from '@skysmack/ng-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { TerminalsAppState, Admin, TerminalStatus, Connection, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { BaseComponent } from '@skysmack/portal-fields';
import { tap, map, switchMap, take } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { GlobalProperties, LocalObject } from '@skysmack/framework';
import { NgClientsStore } from '@skysmack/ng-identities';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { Client } from '@skysmack/packages-identities';

@Component({
  selector: 'ss-terminals-actions',
  templateUrl: './terminals-actions.component.html',
  styleUrls: ['./terminals-actions.component.scss']
})
export class TerminalsActionsComponent extends BaseComponent<TerminalsAppState, unknown> implements OnInit {
  public selectedOption: any;
  public message: string;
  public clientOnline$: Observable<boolean>;
  public onlineAndConnected$: Observable<boolean>;

  private admin$: Observable<Admin>;
  private client$: Observable<LocalObject<Client, string>>;
  private connection$: Observable<LocalObject<Connection, ConnectionKey>>;
  // Connect button, show if client is online, doesn't matter what connection status is. 

  public options: SelectFieldOption[] = [
    {
      value: 1,
      displayName: 'End of day'
    },
    {
      value: 2,
      displayName: 'End of day log'
    },
    {
      value: 3,
      displayName: '(Report) Terminal report'
    },
    {
      value: 4,
      displayName: '(Report) Totals'
    },
    {
      value: 5,
      displayName: '(Report) Log'
    },
    {
      value: 6,
      displayName: '(Report) Old log'
    },
    {
      value: 7,
      displayName: 'Last receipt'
    },
    {
      value: 8,
      displayName: 'Unlock receipt'
    },
    {
      value: 9,
      displayName: 'Clock sync PBS'
    },
    {
      value: 10,
      displayName: 'Clock sync point'
    },
    {
      value: 18,
      displayName: 'Contrast up'
    },
    {
      value: 19,
      displayName: 'Contrast down'
    },
    {
      value: 20,
      displayName: 'Restart terminal'
    },
    {
      value: 21,
      displayName: 'Eject card'
    },
    {
      value: 23,
      displayName: 'Backlight on'
    },
    {
      value: 24,
      displayName: 'Backlight off'
    },
    {
      value: 25,
      displayName: 'Network report'
    },
    {
      value: 44,
      displayName: 'Get IP settings'
    }
    // Alle til og med 10
    // 18 + 19 (contrast) + 20 (restart) + 21
    // 23 + 24 + 25 + 44
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTerminalsActions,
    public requests: NgTerminalsRequests,
    public clientStore: NgClientsStore,
    public skysmackStore: NgSkysmackStore,
    public store: NgTerminalsStore,
    public connectionsStore: NgConnectionsStore,
    public connectionsRequests: NgConnectionsRequests
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();

    const params$ = this.activatedRoute.params as Observable<{ terminalId: number, clientId: string }>;

    this.setClient$(params$);
    this.setConnection$(params$);
    this.setAdmin$(params$);
    this.setClientOnline$();
    this.setOnlineAndConnected$();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  public connect(): void {
    this.connection$.pipe(
      switchMap(connection => this.connectionsRequests.connect(this.packagePath, connection)),
      take(1)
    ).subscribe();
  }

  public submit(): boolean {
    this.message = '';
    if (this.selectedOption) {
      this.admin$.pipe(
        switchMap(admin => {
          admin.adminFunction = this.selectedOption;
          return this.requests.admin(this.packagePath, admin);
        }),
        tap((response) => {
          if (response.ok) {
            this.router.navigate([this.packagePath, 'connections'])
          } else {
            // Error
            this.message = 'Something went wrong. Please try again.';
            if (!GlobalProperties.production) {
              console.log(response);
            }
          }
        })
      );
    } else {
      this.message = 'Please choose an action'
    }

    // Prevents form submit causing a page reload.
    return false;
  }

  private setClient$(params$: Observable<{ terminalId: number; clientId: string; }>): void {
    this.client$ = combineLatest(
      getPackageDendencyAsStream(this.skysmackStore, this.packagePath, [1]),
      params$).pipe(
        switchMap(([identitiesPackage, params]) => this.clientStore.getSingle(identitiesPackage.object.path, params.clientId))
      );
  }

  private setAdmin$(params$: Observable<{ terminalId: number; clientId: string; }>): void {
    this.admin$ = params$.pipe(
      map(params => new Admin({
        terminalId: params.terminalId,
        clientId: params.clientId
      }))
    );
  }

  private setOnlineAndConnected$(): void {
    this.onlineAndConnected$ = combineLatest(this.clientOnline$, this.connection$).pipe(
      map(([clientOnline, connection]) => (clientOnline && (connection.object.status === TerminalStatus.Connected)))
    );
  }

  private setClientOnline$(): void {
    this.clientOnline$ = this.client$.pipe(map(client => client.object.online));
  }

  private setConnection$(params$: Observable<{ terminalId: number; clientId: string; }>): void {
    this.connection$ = params$.pipe(switchMap(params => this.connectionsStore.getSingle(this.packagePath, params)));
  }
}
