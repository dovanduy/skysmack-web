import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-string-array-field',
  templateUrl: './string-array-field.component.html'
})
export class StringArrayFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  @ViewChild('stringInput', { static: false }) public stringInput: ElementRef;

  public inputs: string[] = [];

  ngOnInit() {
    super.ngOnInit();
    this.inputs = this.field.value ? this.field.value : [];
  }

  public add() {
    const value = this.stringInput.nativeElement.value;
    this.inputs.push(value);
    this.stringInput.nativeElement.value = '';
    this.setFieldValue(this.inputs);
  }

  public remove(value: string) {
    this.inputs = this.inputs.filter(input => input !== value);
    this.setFieldValue(this.inputs);
  }
}
