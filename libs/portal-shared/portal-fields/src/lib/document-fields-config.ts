import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { Field, FieldTypes } from '@skysmack/ng-dynamic-forms';
import { IntFieldComponent } from './field-components/components/int-field/int-field.component';
import { Type } from '@angular/core';
import { DoubleFieldComponent } from './field-components/components/double-field/double-field.component';
import { DecimalFieldComponent } from './field-components/components/decimal-field/decimal-field.component';
import { DateTimeFieldComponent } from './field-components/components/date-time-field/date-time-field.component';
import { StringFieldComponent } from './field-components/components/string-field/string-field.component';
import { FieldsConfig } from '@skysmack/ng-fields';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgFieldStore, LoadedPackage } from '@skysmack/ng-framework';
import { FieldProviders } from '@skysmack/ng-fields';
import { BooleanFieldComponent, GuidFieldComponent } from './field-components';

export abstract class DocumentFieldsConfig<TRecord, TKey> extends FieldsConfig<TRecord, TKey> {
    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore,
        public additionalPaths: string[]
    ) {
        super(fieldProviders, additionalPaths);
    }

    public getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Observable<Field[]> {
        const stateKey = this.additionalPaths.length > 0 ? `${loadedPackage._package.path}-${this.additionalPaths.join('-')}` : loadedPackage._package.path;
        return combineLatest([
            this.getRecordFields(loadedPackage, entity),
            this.fieldsStore.get(stateKey)
        ]).pipe(
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
            dynamicField: true,
            sortable: this.getSortFromDynamicFieldType(dynamicField.object.type)
        }));
    }

    protected getComponentFromDynamicFieldType(type: string): Type<any> {
        switch (type) {
            case 'Boolean': return BooleanFieldComponent;
            case 'DateTime': return DateTimeFieldComponent;
            case 'DateTimeOffset': return DateTimeFieldComponent; // MAKE INTO DATETIMEOFFSETFIELDCOMPONENT
            case 'Decimal': return DecimalFieldComponent;
            case 'Double': return DecimalFieldComponent;
            case 'Single': return DoubleFieldComponent;
            case 'Guid': return GuidFieldComponent;
            case 'Int16': return IntFieldComponent;
            case 'Int32': return IntFieldComponent;
            case 'Int64': return IntFieldComponent;
            case 'String': return StringFieldComponent;
            default: console.log('This field type is not defined. Please create a component for it'); return undefined;
        }
    }

    protected getSortFromDynamicFieldType(type: string): boolean {
        switch (type) {
            case 'Boolean': return false;
            case 'DateTime': return true;
            case 'DateTimeOffset': return true;
            case 'Decimal': return true;
            case 'Double': return true;
            case 'Single': return true;
            case 'Guid': return false;
            case 'Int16': return true;
            case 'Int32': return true;
            case 'Int64': return true;
            case 'String': return false;
            default: console.log('This field type is not defined. Please create a component for it'); return false;
        }
    }
}

