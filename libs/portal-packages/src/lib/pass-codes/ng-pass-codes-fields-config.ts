import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, DisplayColumn } from '@skysmack/framework';
import { PassCode, PASS_CODES_AREA_KEY, PASS_CODES_ADDITIONAL_PATHS } from '@skysmack/packages-pass-codes';

import { NgPassCodesValidation } from '@skysmack/ng-pass-codes';
import { NgFieldStore, LoadedPackage, convertObservableToBehaviorSubject } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent, CheckboxFieldComponent, DateTimeFieldComponent, RecurringExpressionFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';
import cronstrue from 'cronstrue/i18n';
import { TranslationRedux } from '@skysmack/ng-translation';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgPassCodesFieldsConfig extends DocumentFieldsConfig<PassCode, number> {
    public validation = new NgPassCodesValidation();
    public area = PASS_CODES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore,
        private translationRedux: TranslationRedux
    ) {
        super(fieldProviders, fieldsStore, PASS_CODES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<PassCode, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.code : undefined,
                key: 'code',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                order: 2,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validFrom : undefined,
                key: 'validFrom',
                validators: [Validators.required],
                order: 2,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validTo : undefined,
                key: 'validTo',
                validators: [Validators.required],
                order: 2,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: RecurringExpressionFieldComponent,
                value: entity ? entity.object.expression : undefined,
                key: 'expression',
                displayModifier: (column: DisplayColumn, providedEntity: LocalObject<any, any>) => {
                    const exp = providedEntity.object.expression;
                    const expression = exp.expression
                    const language = convertObservableToBehaviorSubject(this.translationRedux.getLanguage(), 'en').getValue();

                    if (Number(exp.cronStringFormat) === 3 && typeof expression === 'string') {
                        const result = (expression as string).slice(0, expression.length - 4);
                        return cronstrue.toString(result, { use24HourTimeFormat: true, locale: language });
                    } else if (typeof expression === 'string') {
                        return cronstrue.toString(expression, { use24HourTimeFormat: true, locale: language });
                    } else {
                        return '';
                    }
                },
                validators: [Validators.required],
                order: 2,
                showColumn: true,
            }),

            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.disabled : undefined,
                key: 'disabled',
                validators: [Validators.required],
                order: 2,
                showColumn: true,
                sortable: true
            })
        ];

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
