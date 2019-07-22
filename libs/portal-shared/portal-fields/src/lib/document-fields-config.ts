import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { Field, FieldTypes } from '@skysmack/ng-dynamic-forms';
import { IntFieldComponent } from './field-components/components/int-field/int-field.component';
import { Type } from '@angular/core';
import { LimitedStringFieldComponent } from './field-components/components/limited-string-field/limited-string-field.component';
import { GeographyFieldComponent } from './field-components/components/geography-field/geography-field.component';
import { DoubleFieldComponent } from './field-components/components/double-field/double-field.component';
import { DecimalFieldComponent } from './field-components/components/decimal-field/decimal-field.component';
import { DateTimeFieldComponent } from './field-components/components/date-time-field/date-time-field.component';
import { StringFieldComponent } from './field-components/components/string-field/string-field.component';
import { FieldsConfig } from '@skysmack/ng-fields';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgFieldStore, LoadedPackage, getAdditionalPaths } from '@skysmack/ng-framework';
import { FieldProviders } from '@skysmack/ng-fields';
import { Router } from '@angular/router';

export abstract class DocumentFieldsConfig<TRecord, TKey> extends FieldsConfig<TRecord, TKey> {
    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore,
        public router: Router
    ) {
        super(fieldProviders);
    }

    public getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Observable<Field[]> {
        const packagePath = this.router.url.split('/')[1];
        const additionalPaths = getAdditionalPaths(this.router, packagePath);
        const stateKey = additionalPaths.length > 0 ? `${loadedPackage._package.path}-${additionalPaths.join('-')}` : loadedPackage._package.path;
        return combineLatest(
            this.getRecordFields(loadedPackage, entity),
            this.fieldsStore.get(stateKey)
        ).pipe(
            map(values => values[0].concat(this.toFields(entity, values[1]))),
            map(fields => this.addValidationErrors(fields, entity).sort((a, b) => a.order - b.order))
        );
    }

    private toFields(entity: LocalObject<TRecord, TKey>, dynamicFields: LocalObject<FieldSchemaViewModel, string>[]): Field[] {
        return dynamicFields.map(dynamicField => new Field({
            fieldType: Number(FieldTypes[dynamicField.object.type]),
            component: this.getComponentFromDynamicFieldType(dynamicField.object.type),
            value: entity ? entity.object[dynamicField.object.key] : undefined,
            key: dynamicField.object.key,
            label: dynamicField.object.display,
            placeholder: dynamicField.object.display,
            order: 4,
            showColumn: true,
            dynamicField: true
        }));
    }

    protected getComponentFromDynamicFieldType(type: string): Type<any> {
        switch (type) {
            case 'int': return IntFieldComponent;
            case 'string': return StringFieldComponent;
            case 'dateTime': return DateTimeFieldComponent;
            case 'decimal': return DecimalFieldComponent;
            case 'double': return DoubleFieldComponent;
            case 'geography': return GeographyFieldComponent;
            case 'limitedString': return LimitedStringFieldComponent;
            default: console.log('This field type is not defined. Please create a component for it'); return undefined;
        }
    }
}
