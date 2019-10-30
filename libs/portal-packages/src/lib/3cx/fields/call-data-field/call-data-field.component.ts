import { Component, OnInit } from '@angular/core';
import { Field, SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { callData } from '@skysmack/packages-3cx';

@Component({
  selector: 'ss-call-data-field',
  templateUrl: './call-data-field.component.html',
  styleUrls: ['./call-data-field.component.scss']
})
export class CallDataFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  public allData = callData;
  public currentData: string[];
  public include: SelectFieldOption[] = [];
  public exclude: SelectFieldOption[] = [];

  ngOnInit() {
    super.ngOnInit();
    this.currentData = this.getFieldValue() ? this.getFieldValue() : [];

    this.allData.forEach(dataPiece => {
      const isIncludedData = this.currentData.find(currentData => currentData === dataPiece.value);
      if (isIncludedData) {
        this.include.push(dataPiece)
      } else {
        this.exclude.push(dataPiece)
      }
    });

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

    const newFieldValue = this.include.map(x => x.value);
    this.setFieldValue(newFieldValue);
  }
}
