import { Injectable } from '@angular/core';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { SelectFieldComponent } from '@skysmack/portal-fields';
import { LocalObject, HttpSuccessResponse } from '@skysmack/framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { LoadedPackage } from '@skysmack/ng-framework';
import { map } from 'rxjs/operators';
import { CommercialUsersRolesValidation } from './commercial-users-roles-validation';
import { PartnerUserRole } from '../../models/partner-user-role';
import { CommercialUsersService } from '../../services/commercial-users.service';

@Injectable({ providedIn: 'root' })
export class CommercialUsersRolesFieldsConfig extends FieldsConfig<any, any>{
    public validation = new CommercialUsersRolesValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private commercialUsersService: CommercialUsersService
    ) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<PartnerUserRole, any>): Field[] {
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
                value: entity ? entity.object.roleName : undefined,
                key: 'roleName',
                optionsData$: this.commercialUsersService.getRoles().pipe(map(x => (x as HttpSuccessResponse<any[]>).body)),
                valueSelector: 'name',
                displayNameSelector: 'name',
                order: 2,
                showColumn: true
            })
        ];

        return fields;
    }
}
