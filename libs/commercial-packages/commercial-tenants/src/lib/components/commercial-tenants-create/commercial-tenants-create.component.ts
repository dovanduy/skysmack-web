import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { SubscriptionHandler } from '@skysmack/framework';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';
import { CommercialTenantsFieldsConfig } from '../../commercial-tenants-fields-config';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-tenants-create',
  templateUrl: './commercial-tenants-create.component.html',
  styleUrls: ['./commercial-tenants-create.component.scss'],
})
export class CommercialTenantsCreateComponent implements OnInit, OnDestroy {
  public fields$: Observable<Field[]>;
  public subscriptionHandler = new SubscriptionHandler();
  public creating = false;

  constructor(
    public router: Router,
    public fieldsConfig: CommercialTenantsFieldsConfig,
    public ngRedux: NgRedux<any>,
    public service: CommercialTenantsService
  ) { }

  ngOnInit() {
    this.fields$ = this.fieldsConfig.getFields(null, null);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.creating = true;

      const tenant = fh.form.getRawValue();
      this.subscriptionHandler.register(this.service.add(tenant).pipe(
        tap(() => this.router.navigate(['/', 'tenants'])),
        take(1)
      ).subscribe());
    }, false);
  }
}
