import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, SelectField, SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { LocalObject, HttpSuccessResponse } from '@skysmack/framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { LoadedPackage } from '@skysmack/ng-framework';
import { CommercialTenantsUsersValidation } from './commercial-tenants-users-validation';
import { PartnerTenant } from '../../models/partner-tenant';
import { CommercialTenantsService } from '../../services';
import { CommercialUsersService } from '@skysmack/commercial-users';
import { of } from 'rxjs';
import { PartnerTenantStatus } from '../../models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CommercialTenantsUsersFieldsConfig extends FieldsConfig<any, any>{
    public validation = new CommercialTenantsUsersValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private commercialTenantsService: CommercialTenantsService,
        private commercialUsersService: CommercialUsersService
    ) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<PartnerTenant, any>): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.userId : undefined,
                key: 'userId',
                optionsData$: this.commercialUsersService.get().pipe(map(x => (x as HttpSuccessResponse<any[]>).body)),
                valueSelector: 'id',
                displayNameSelector: 'email',
                order: 1,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.tenantId : undefined,
                key: 'tenantId',
                optionsData$: this.commercialTenantsService.get().pipe(map(x => (x as HttpSuccessResponse<any[]>).body)),
                valueSelector: 'id',
                displayNameSelector: 'name',
                order: 2,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.status : undefined,
                key: 'status',
                optionsData$: of(PartnerTenantStatus),
                optionsDataType: 'ts-enum',
                modifyDisplayName: (options: SelectFieldOption[], optionsData: any[]) => options.map(option => {
                    option.displayName = `${option.displayName[0].toUpperCase()}${option.displayName.slice(1)}`;
                    return option;
                }),
                validators: [Validators.required],
                order: 3,
                sortable: true
            })

        ];

        return fields;
    }
}
