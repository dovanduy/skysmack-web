import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { FormHelper, Field, FormRule } from '@skysmack/ng-ui';
import { DynamicFormFieldDirective } from '../dynamic-form-field.directive';
import { DynamicField } from '../dynamic-field';

@Component({
  selector: 'ss-dynamic-form-field-template',
  templateUrl: './dynamic-form-field-template.component.html'
})
export class DynamicFormFieldTemplateComponent implements OnInit {

  @Input() fh: FormHelper;
  @Input() field: Field;
  @Input() fieldKey: string;
  @Input() fields: Field[];
  @Input() rules: FormRule[];

  @ViewChild(DynamicFormFieldDirective) dynamicFormField: DynamicFormFieldDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.field.component);

    const viewContainerRef = this.dynamicFormField.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<DynamicField>componentRef.instance).fh = this.fh;
    (<DynamicField>componentRef.instance).fieldKey = this.fieldKey;
    (<DynamicField>componentRef.instance).fields = this.fields;
    (<DynamicField>componentRef.instance).field = this.field;
    (<DynamicField>componentRef.instance).rules = this.rules;
  }
}
