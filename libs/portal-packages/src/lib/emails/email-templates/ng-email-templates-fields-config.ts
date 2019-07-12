import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { EmailTemplate, EMAIL_TEMPLATES_AREA_KEY } from '@skysmack/packages-emails';

import { StringFieldComponent, HiddenFieldComponent, EmailTemplateFieldComponent } from '@skysmack/portal-fields';
import { NgEmailTemplatesValidation } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';

export interface NgEmailTemplateFormDependencies {
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgEmailTemplatesFieldsConfig extends FieldsConfig<EmailTemplate, number> {
  public validation = new NgEmailTemplatesValidation();
  public area = EMAIL_TEMPLATES_AREA_KEY;
  public formRules: FormRule[] = [];

  constructor(
    public fieldProviders: FieldProviders
  ) {
    super(fieldProviders);
  }

  protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<EmailTemplate, number>): Field[] {
    const fields = [
      new Field({
        value: entity ? entity.object.from : undefined,
        component: StringFieldComponent,
        key: 'from',
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.to : undefined,
        component: StringFieldComponent,
        key: 'to',
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.cc : undefined,
        component: StringFieldComponent,
        key: 'cc',
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.bcc : undefined,
        component: StringFieldComponent,
        key: 'bcc',
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.subject : undefined,
        component: StringFieldComponent,
        key: 'subject',
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.body : undefined,
        component: EmailTemplateFieldComponent,
        key: 'body'
      }),
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
