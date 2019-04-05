import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { Field, FieldTypes } from '@skysmack/ng-ui';
import { IntFieldComponent } from '../components/field-components/components/int-field/int-field.component';
import { Type } from '@angular/core';
import { LimitedStringFieldComponent } from '../components/field-components/components/limited-string-field/limited-string-field.component';
import { GeographyFieldComponent } from '../components/field-components/components/geography-field/geography-field.component';
import { DoubleFieldComponent } from '../components/field-components/components/double-field/double-field.component';
import { DecimalFieldComponent } from '../components/field-components/components/decimal-field/decimal-field.component';
import { DateTimeFieldComponent } from '../components/field-components/components/date-time-field/date-time-field.component';
import { StringFieldComponent } from '../components/field-components/components/string-field/string-field.component';
import { LoadedPackage } from '@skysmack/ng-packages';
import { FieldsConfig } from './fields-config';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


import { NgFieldStore } from '@skysmack/ng-redux';
import { FieldProviders } from './field-providers';

export abstract class DocumentFieldsConfig<TRecord, TKey> extends FieldsConfig<TRecord, TKey> {
    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore
    ) {
        super(fieldProviders);
    }

    public getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Observable<Field[]> {
        return combineLatest(
            this.getRecordFields(loadedPackage, entity),
            this.fieldsStore.get(loadedPackage._package.path)
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
