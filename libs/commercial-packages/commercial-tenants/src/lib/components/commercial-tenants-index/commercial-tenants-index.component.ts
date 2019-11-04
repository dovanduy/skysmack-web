import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';
import { Tenant } from '../../models/tenant';
import { map, take, tap } from 'rxjs/operators';
import { HttpSuccessResponse, SubscriptionHandler } from '@skysmack/framework';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialog, RemoveDialogData } from '@skysmack/commercial-ui-partners';
import { TenantStates } from '../../models/tenant-states';

@Component({
  selector: 'ss-commercial-tenants-index',
  templateUrl: './commercial-tenants-index.component.html',
  styleUrls: ['./commercial-tenants-index.component.scss']
})
export class CommercialTenantsIndexComponent implements OnInit {
  public loading = true;
  private subscriptionHandler = new SubscriptionHandler();
  public tenants$: Observable<Tenant[]>

  constructor(
    public service: CommercialTenantsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshTenants();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  private refreshTenants() {
    this.tenants$ = this.service.get().pipe(
      map((x: HttpSuccessResponse<Tenant[]>) => {
        this.loading = false;
        return x.body;
      }),
      take(1)
    );
  }

  public remove(tenant: Tenant): void {
    this.dialog.open(RemoveDialog, {
      width: '350px',
      data: new RemoveDialogData({
        name: tenant.name, removeMethod: () => {
          this.loading = true;
          this.subscriptionHandler.register(this.service.delete(tenant.id).pipe(
            tap(() => {
              this.refreshTenants();
            }),
            take(1)
          ).subscribe());
        }
      })
    });
  }

  public displayModifier = (entity: Tenant): string => {
    return TenantStates[entity.state];
  }
}
