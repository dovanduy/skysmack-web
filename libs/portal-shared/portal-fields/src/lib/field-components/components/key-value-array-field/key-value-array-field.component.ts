import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';
import { Guid } from 'guid-typescript';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddValueArrayDialogComponent } from './add-key-value-dialog/add-key-value-dialog.component';
import { tap } from 'rxjs/operators';

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
  public editInputs: { id: string, key: string, value: string }[] = [];

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

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
  }

  public add() {
    this.subscriptionHandler.register(this.dialog.open(AddValueArrayDialogComponent, {
      minWidth: 320,
      data: this.field
    }).afterClosed().pipe(
      tap(input => {
        if (input && input.key && input.value) {
          this.inputs.push({
            id: Guid.create().toString(),
            ...input
          });

          this.setFieldValue(this.inputs.map(x => ({ key: x.key, value: x.value })));
        }
      })
    ).subscribe());
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
    if (!this.editKeyValues) {
      // Start editing
      this.editInputs = JSON.parse(JSON.stringify(this.inputs)); // Clone values.
    } else {
      // Close and reset
      this.editInputs = [];
    }

    this.editKeyValues = !this.editKeyValues;
  }

  public submitKeyValueChanges() {
    this.inputs = this.editInputs.map(x => ({ id: x.id, key: x.key, value: x.value }));
    this.setFieldValue(this.inputs);
    this.toggleEditKeyValues();
  }

  public keyChanged(id: string, change: string) {
    const found = this.editInputs.find(x => x.id === id);
    if (found) {
      found.key = change;
    }
  }

  public valueChanged(id: string, change: string) {
    const found = this.editInputs.find(x => x.id === id);
    if (found) {
      found.value = change;
    }
  }
}
