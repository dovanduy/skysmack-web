import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';
import { Guid } from 'guid-typescript';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ss-key-value-array-field',
  templateUrl: './key-value-array-field.component.html',
  styleUrls: ['./key-value-array-field.component.scss']
})
export class KeyValueArrayFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  @ViewChild('keyInput', { static: false }) public keyInput: ElementRef;
  @ViewChild('valueInput', { static: false }) public valueInput: ElementRef;

  public editKeyValues: boolean;
  public inputs: { id: string, key: string, value: string }[] = [];

  ngOnInit() {
    super.ngOnInit();
    if (this.field.value) {
      for (let index = 0; index < this.field.value.length; index++) {
        const element = this.field.value[index];

        this.inputs.push({
          id: Guid.create().toString(),
          key: element.key,
          value: element.value
        });
      }
      this.setFieldValue(this.inputs.map(x => ({ key: x.key, value: x.value, id: x.id })));
    }
    // this.inputs = this.field.value ? this.field.value : [];
    // this.inputs.map(input => input.id = Guid.create().toString());
  }

  public add() {
    const key = this.keyInput.nativeElement.value;
    const value = this.valueInput.nativeElement.value;

    this.inputs.push({
      id: Guid.create().toString(),
      key,
      value
    });

    this.keyInput.nativeElement.value = '';
    this.valueInput.nativeElement.value = '';

    this.setFieldValue(this.inputs.map(x => ({ key: x.key, value: x.value })));
  }

  public remove(id: string) {
    this.inputs = this.inputs.filter(input => input.id !== id);
    const values = this.inputs.map(x => ({ key: x.key, value: x.value }));
    this.setFieldValue(values.length > 0 ? values : null);
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.setFieldValue(this.inputs);
  }

  public toggleEditKeyValues() {
    this.editKeyValues = !this.editKeyValues;
  }

  public test(args) {
    console.log(args);
  }
}
