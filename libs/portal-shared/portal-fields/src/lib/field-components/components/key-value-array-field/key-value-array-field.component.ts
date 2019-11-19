import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'ss-key-value-array-field',
  templateUrl: './key-value-array-field.component.html'
})
export class KeyValueArrayFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  @ViewChild('keyInput', { static: false }) public keyInput: ElementRef;
  @ViewChild('valueInput', { static: false }) public valueInput: ElementRef;

  public inputs: { id: string, key: string, value: string }[] = [];

  ngOnInit() {
    super.ngOnInit();
    this.inputs = this.field.value ? this.field.value : [];
  }

  public add() {
    const key = this.keyInput.nativeElement.value;
    const value = this.valueInput.nativeElement.value;

    this.inputs.push({
      id: Guid.create().toString(),
      key,
      value
    });

    this.keyInput.nativeElement.value;
    this.valueInput.nativeElement.value;

    this.setFieldValue(this.inputs.map(x => ({ key: x.key, value: x.value })));
  }

  public remove(id: string) {
    this.inputs = this.inputs.filter(input => input.id !== id);
    const values = this.inputs.map(x => ({ key: x.key, value: x.value }));
    this.setFieldValue(values.length > 0 ? values : null);
  }
}
