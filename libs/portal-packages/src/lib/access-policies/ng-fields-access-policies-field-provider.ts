import { Injectable } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { Observable, of } from 'rxjs';
import { StrIndex, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { FieldProvider } from '@skysmack/ng-fields';
import { Guid } from 'guid-typescript';
import { FieldPermissionFieldComponent } from './access-policy-roles/components/field-permission-field/field-permission-field.component';
import { UI_AREA_KEY } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgFieldsAccessPoliciesFieldProvider extends FieldProvider {

    public id = Guid.create().toString();
    public register: StrIndex<boolean> = {};

    constructor() { super(); }

    public getFields(packagePath: string, area: string, entity?: LocalObject<FieldSchemaViewModel, string>): Observable<Field[]> {
        if (area == UI_AREA_KEY) {
            return of([
                new Field({
                    component: FieldPermissionFieldComponent,
                    value: entity ? entity.object.writePermission : undefined,
                    key: 'writePermission',
                    order: 5,
                }),

                new Field({
                    component: FieldPermissionFieldComponent,
                    value: entity ? entity.object.readPermission : undefined,
                    key: 'readPermission',
                    order: 6,
                }),
            ]);
        } else {
            return of([]);
        }
    }
}
