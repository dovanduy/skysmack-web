import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators, Field, FieldTypes, FieldsConfig } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { IdentitiesSettings } from '@skysmack/packages-identities';
import { NgIdentitiesSettingsValidation } from './ng-identities-settings-validation';

export interface NgIdentitiesSettingsFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgIdentitiesSettingsFieldsConfig extends FieldsConfig<IdentitiesSettings, number, NgIdentitiesSettingsFormDependencies> {
    public validation = new NgIdentitiesSettingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(settings?: LocalObject<IdentitiesSettings, number>, dependencies?: NgIdentitiesSettingsFormDependencies): Field[] {
        const fields = [
            // UserOptions
            new Field({
                fieldType: FieldTypes.string,
                value: settings ? settings.object.userOptions.allowedUserNameCharacters : undefined,
                key: 'allowedUserNameCharacters',
                order: 1
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.userOptions.requireUniqueEmail : undefined,
                key: 'requireUniqueEmail',
                order: 2
            } as Field),

            // PasswordOptions
            new Field({
                fieldType: FieldTypes.int,
                value: settings ? settings.object.passwordOptions.requiredLength : undefined,
                key: 'allowedUserNameCharacters',
                order: 3
            } as Field),
            new Field({
                fieldType: FieldTypes.int,
                value: settings ? settings.object.passwordOptions.requiredUniqueChars : undefined,
                key: 'requiredUniqueChars',
                order: 4
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.passwordOptions.requireNonAlphanumeric : undefined,
                key: 'requireNonAlphanumeric',
                order: 5
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.passwordOptions.requireLowercase : undefined,
                key: 'requireLowercase',
                order: 6
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.passwordOptions.requireUppercase : undefined,
                key: 'requireUppercase',
                order: 7
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.passwordOptions.requireDigit : undefined,
                key: 'requireDigit',
                order: 8
            } as Field),

            // LockoutOptions
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.lockoutOptions.allowedForNewUsers : undefined,
                key: 'allowedForNewUsers',
                order: 9
            } as Field),
            new Field({
                fieldType: FieldTypes.int,
                value: settings ? settings.object.lockoutOptions.maxFailedAccessAttempts : undefined,
                key: 'maxFailedAccessAttempts',
                order: 10
            } as Field),
            new Field({
                fieldType: FieldTypes.string,
                value: settings ? settings.object.lockoutOptions.defaultLockoutTimeSpan : undefined,
                key: 'defaultLockoutTimeSpan',
                order: 11
            } as Field),

            // SignInOptions
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.signInOptions.requireConfirmedEmail : undefined,
                key: 'requireConfirmedEmail',
                order: 12
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.signInOptions.requireConfirmedPhoneNumber : undefined,
                key: 'requireConfirmedPhoneNumber',
                order: 13
            } as Field)
        ];

        return fields;
    }
}
