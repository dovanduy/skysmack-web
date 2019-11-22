import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { SubscriptionHandler, HttpSuccessResponse, toLocalObject } from '@skysmack/framework';
import { NgRedux } from '@angular-redux/store';
import { Router, ActivatedRoute } from '@angular/router';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';
import { CommercialTenantsFieldsConfig } from '../../commercial-tenants-fields-config';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { InstallTenant } from '../../models/install-tenant';

@Component({
  selector: 'ss-commercial-tenants-edit',
  templateUrl: './commercial-tenants-edit.component.html',
  styleUrls: ['./commercial-tenants-edit.component.scss'],
})
export class CommercialTenantsEditComponent implements OnInit, OnDestroy {
  public fields$: Observable<Field[]>;
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public fieldsConfig: CommercialTenantsFieldsConfig,
    public ngRedux: NgRedux<any>,
    public service: CommercialTenantsService
  ) { }

  ngOnInit() {
    this.fields$ = this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(id => this.service.getById(id)),
      switchMap((response: HttpSuccessResponse<InstallTenant>) => this.fieldsConfig.getFields(null, toLocalObject(response.body)))
    );
  }

  public ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const tenant = fh.form.getRawValue();
      this.subscriptionHandler.register(this.service.update(tenant).pipe(
        tap(() => this.router.navigate(['/', 'tenants'])),
        take(1)
      ).subscribe());
    }, false);
  }
}
