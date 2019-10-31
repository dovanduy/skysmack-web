import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercialDatabasesService } from '../../services/commercial-databases.service';
import { Database } from '../../models/database';
import { map, take, tap } from 'rxjs/operators';
import { HttpSuccessResponse, SubscriptionHandler } from '@skysmack/framework';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialog, RemoveDialogData } from '@skysmack/commercial-ui-partners';

@Component({
  selector: 'ss-commercial-databases-index',
  templateUrl: './commercial-databases-index.component.html',
  styleUrls: ['./commercial-databases-index.component.scss']
})
export class CommercialDatabasesIndexComponent implements OnInit {
  public loading = true;
  private subscriptionHandler = new SubscriptionHandler();
  public databases$: Observable<Database[]>

  constructor(
    public service: CommercialDatabasesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshDatabases();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  private refreshDatabases() {
    this.databases$ = this.service.get().pipe(
      map((x: HttpSuccessResponse<Database[]>) => {
        this.loading = false;
        return x.body;
      }),
      take(1)
    );
  }

  public remove(database: Database): void {
    this.dialog.open(RemoveDialog, {
      width: '350px',
      data: new RemoveDialogData({
        name: database.databaseName, removeMethod: () => {
          this.loading = true;
          this.subscriptionHandler.register(this.service.delete(database.databaseName).pipe(
            tap(() => {
              this.refreshDatabases();
            }),
            take(1)
          ).subscribe());
        }
      })
    });
  }
}
