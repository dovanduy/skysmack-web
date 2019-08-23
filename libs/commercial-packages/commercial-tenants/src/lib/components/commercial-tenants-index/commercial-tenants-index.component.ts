import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';
import { Tenant } from '../../models/tenant';
import { map, take } from 'rxjs/operators';
import { HttpResponse, HttpSuccessResponse } from '@skysmack/framework';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RemoveDialog, RemoveDialogData } from '@skysmack/commercial-ui-partners';

@Component({
  selector: 'ss-commercial-tenants-index',
  templateUrl: './commercial-tenants-index.component.html',
  styleUrls: ['./commercial-tenants-index.component.scss']
})
export class CommercialTenantsIndexComponent implements OnInit {

  public tenants$: Observable<Tenant[]>

  constructor(
    public service: CommercialTenantsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshTenants();
  }

  private refreshTenants() {
    this.tenants$ = this.service.get().pipe(
      map((x: HttpSuccessResponse<Tenant[]>) => x.body),
      take(1)
    );
  }

  public remove(tenant: Tenant): void {
      this.dialog.open(RemoveDialog, {
        width: '350px',
        data: new RemoveDialogData({ name: tenant.name, removeMethod: () => { 
          this.service.delete(tenant.id).pipe(take(1)).subscribe();
          this.refreshTenants();
        }})
      });
  }
}
