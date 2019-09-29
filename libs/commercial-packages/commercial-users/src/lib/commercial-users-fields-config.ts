import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent, PasswordFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { CommercialUsersValidation } from './commercial-users-validation';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { LoadedPackage } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class CommercialUsersFieldsConfig extends FieldsConfig<any, any>{
    public validation = new CommercialUsersValidation();
    public area = '';
    public formRules: FormRule[] = [];

    public mode: 'create' | 'edit' = 'create';

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<any, any>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.firstName : undefined,
                key: 'firstName',
                validators: [Validators.required],
                order: 1,
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.lastName : undefined,
                key: 'lastName',
                validators: [Validators.required],
                order: 2,
            })
        ];

        if (this.mode === 'create') {
            fields.push(
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.email : undefined,
                key: 'email',
                validators: [Validators.required],
                order: 3,
            }));
            fields.push(
                new Field({
                    component: PasswordFieldComponent,
                    value: undefined,
                    key: 'password',
                    label: 'Password',
                    validators: [Validators.required, CustomValidators.validPassword()],
                    order: 2,
                    placeholder: 'Password',
                }));
fields.push(
                new Field({
                    component: PasswordFieldComponent,
                    value: undefined,
                    key: 'confirmPassword',
                    label: 'Confirm password',
                    validators: [Validators.required],
                    order: 3,
                    placeholder: 'Password',
                })
            );
        }

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
